"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button, Column, Text, Icon } from "@once-ui-system/core";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Column
      as="form"
      onSubmit={handleLogin}
      gap="m"
      style={{ maxWidth: 400, margin: "3rem auto", padding: "0 1rem" }}
    >
      <Text as="h1" size="xl">
        Login
      </Text>

      {/* Email Field */}
      <div>
        <Text
          as="label"
          htmlFor="input-email"
          size="m"
          style={{ marginBottom: 2, display: "block" }}
        >
          Email
        </Text>
        <Input
          id="input-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          hasPrefix={
            <Icon
              marginLeft="4"
              onBackground="neutral-weak"
              name="email"
              size="s"
            />
          }
        />
      </div>

      {/* Password Field */}
      <div>
        <Text
          as="label"
          htmlFor="input-password"
          size="m"
          style={{ marginBottom: 2, display: "block" }}
        >
          Password
        </Text>
        <Input
          id="input-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          hasPrefix={
            <Icon
              marginLeft="4"
              onBackground="neutral-weak"
              name="lock"
              size="s"
            />
          }
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="l"
        style={{ backgroundColor: "#2563eb", borderColor: "#2563eb" }}
      >
        Login
      </Button>

      <Text size="s">
        Don't have an account?{" "}
        <Link
          href="/register"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          Register here
        </Link>
      </Text>

      <Text size="s" style={{ marginTop: 4, color: "#555" }}>
        <b>Note:</b> Use <code>Email: admin@example.com</code> and{" "}
        <code>Password: admin123</code> to login.
      </Text>
    </Column>
  );
}
