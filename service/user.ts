// import http from '@/helper/axios';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// export const userService = {
//   getAll: () => http.get<User[]>(userEndpoints.getAll),
//   getById: (id: number) => http.get<User>(userEndpoints.getById(id)),
//   create: (data: Omit<User, 'id'>) => http.post<User, typeof data>(userEndpoints.create, data),
//   update: (id: number, data: Partial<Omit<User, 'id'>>) =>
//     http.put<User, typeof data>(userEndpoints.update(id), data),
//   remove: (id: number) => http.delete<{ success: boolean }>(userEndpoints.delete(id)),
// };
