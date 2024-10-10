import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Определяем тип задачи
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Тип данных для создания новой задачи
interface NewTask {
    title: string;
    completed?: boolean;
}

// URL для запросов
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const useTasks = () => {
    const queryClient = useQueryClient();

    // GET-запрос для получения первых 10 задач
    const {
        data: tasks = [], // Обязательно задаем значение по умолчанию для задач
        isLoading: isLoadingTasks,
        isError: isErrorTasks,
        error: errorTasks,
        isFetching: isFetchingTasks,
    } = useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await axios.get<Task[]>(`${BASE_URL}?_limit=10`);
            return response.data;
        },
    });

    // Мутация для создания новой задачи (CREATE)
    const createTaskMutation = useMutation<Task, Error, NewTask>({
        mutationFn: async (newTask) => {
            const response = await axios.post<Task>(BASE_URL, newTask);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    // Мутация для обновления существующей задачи (UPDATE)
    const updateTaskMutation = useMutation<
        Task,
        Error,
        { taskId: number; updatedTask: Partial<Task> },
        { previousTasks: Task[] | undefined }
    >({
        mutationFn: async ({ taskId, updatedTask }) => {
            const response = await axios.put<Task>(`${BASE_URL}/${taskId}`, updatedTask);
            return response.data;
        },
        onMutate: async ({ taskId, updatedTask }) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

            queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
                oldTasks?.map((task: Task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                )
            );

            return { previousTasks };
        },
        onError: (err, variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(['tasks'], context.previousTasks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    // Мутация для удаления задачи (DELETE)
    const deleteTaskMutation = useMutation<void, Error, number, { previousTasks: Task[] | undefined }>({
        mutationFn: async (taskId) => {
          await axios.delete(`${BASE_URL}/${taskId}`);
        },
        onMutate: async (taskId) => {
          await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
          const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      
          queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
            oldTasks?.filter((task) => task.id !== taskId)
          );
      
          return { previousTasks };
        },
        onError: (err, taskId, context) => {
          if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
      });
      

    // Возвращаем все данные и функции из хука
    return {
        tasks,
        isLoadingTasks,
        isErrorTasks,
        errorTasks,
        isFetchingTasks,
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
    };
};

export default useTasks;
