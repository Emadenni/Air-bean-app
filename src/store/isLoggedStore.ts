import {create} from 'zustand';

interface UserState {
  checkLoginStatus: any;
  isLoggedIn: boolean;
}

const useLoggedStore = create<UserState>((set) => ({
  isLoggedIn: false,
  checkLoginStatus: async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        set({ isLoggedIn: false });
        return;
      }
      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("status", data);

        if (data.success) {
          set({ isLoggedIn: true });
        } else {
          set({ isLoggedIn: false });
        }
      } else {
        set({ isLoggedIn: false });
        console.error("Error in GET request to check login status");
      }
    } catch (error) {
      set({ isLoggedIn: false });
      console.error("An error occurred during the GET request to check login status:", error);
    }
  }
}));

export default useLoggedStore;
