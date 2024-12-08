'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useJwt } from "@/context/jwt";
import { useEffect } from "react";

export default function Home() {
  const { user } = useJwt();

  useEffect(() => {
    if (!user) {
      console.log('Fetching user data...');
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Show a loading state until user info is fetched
  }

  return <div>hello {user.username}</div>
}
