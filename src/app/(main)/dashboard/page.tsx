"use client";

import { useSession } from "next-auth/react";
import { Column, Text } from "@once-ui-system/core";
import Lottie from "lottie-react";
import animation404 from "./hello.json";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Text size="m">Loading...</Text>;
  }

  return (
    <Column
      gap="s"
      style={{ marginTop: "3rem", alignItems: "center", textAlign: "center" }}
    >
    <Text as="h1" size="xl">
        Dashboard
      </Text>

      <Text size="m">
        Welcome, {session?.user?.name} ({session?.user?.email})
      </Text>
      <Lottie animationData={animation404} style={{ width: 200, height: 200 }} />
    
    </Column>
  );
}
