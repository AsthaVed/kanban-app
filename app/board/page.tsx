"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useRouter } from "next/navigation";
import { logout } from "../../store/authSlice";

export default function BoardPage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.userEmail);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {email}</h1>
      <button
        onClick={handleLogout}
        className="mt-5 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
      {/* Kanban Board will go here */}
    </div>
  );
}
