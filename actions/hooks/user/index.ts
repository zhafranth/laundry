import { Params } from "@/actions/interface";
import {
  createUser,
  deleteUser,
  getProfile,
  getUser,
  getUsers,
  updateUser,
} from "@/actions/networks/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadPhotoProfile, removePhotoProfile } from "@/actions/actions/user";
import { toast } from "react-toastify";
import { UserPayload } from "@/actions/actions/user/User.interface";

export const useFetchProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
};

export const useGetUsers = (params?: Params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetUser = (id?: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export const useUpload = () => {
  const { mutate: mutateUpload, isPending: loadingUpload } = useMutation({
    mutationFn: (data: FormData) => uploadPhotoProfile(data),
  });
  const { mutate: mutateRemove, isPending: loadingRemove } = useMutation({
    mutationFn: (url: string) => removePhotoProfile(url),
  });

  return { mutateUpload, loadingUpload, mutateRemove, loadingRemove };
};

export const useUser = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateUser, isPending: pendingCreate } = useMutation({
    mutationFn: (data: UserPayload) => createUser(data),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { mutate: mutateUpdateUser, isPending: pendingUpdate } = useMutation({
    mutationFn: ({ data, id }: { data: UserPayload; id: string }) =>
      updateUser(id, data),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { mutate: mutateDeleteUser, isPending: pendingDelete } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    mutateCreateUser,
    mutateUpdateUser,
    mutateDeleteUser,
    pendingDelete,
    pendingUpdate,
    pendingCreate,
  };
};
