import{ create }from 'zustand';

interface UserData {
  name: string;
  email: string;
  username: string;
}

interface UserStore {
  userData: UserData[];
  addUser: (newUser: UserData) => void;
}

const useUserDataStore = create<UserStore>((set) => ({
  userData: [],
  addUser: (newUser) => set((state) => ({ userData: [...state.userData, newUser] })),
}));

export default useUserDataStore;
