import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input, Button, Column, Text, Icon } from "@once-ui-system/core";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (login?.ok) {
        router.push("/dashboard");
      }
    } else {
      alert("Register failed");
    }
  };

  return (
    <Column
      as="form"
      onSubmit={handleRegister}
      gap="m"
      style={{ maxWidth: 400, margin: "3rem auto", padding: "0 1rem" }}
    >
      <Text as="h1" size="xl">
        Register
      </Text>

      {/* Name Field */}
      <div>
        <Text
          as="label"
          htmlFor="input-name"
          size="m"
          style={{ marginBottom: 2, display: "block" }}
        >
          Name
        </Text>
        <Input
          id="input-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          hasPrefix={
            <Icon
              marginLeft="4"
              onBackground="neutral-weak"
              name="user"
              size="s"
            />
          }
        />
      </div>

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
        size="m"
        style={{ backgroundColor: "#2563eb", borderColor: "#2563eb" }}
      >
        Register
      </Button>

      <Text size="s">
        Already have an account?{" "}
        <Link
          href="/login"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          Login here
        </Link>
      </Text>
    </Column>
  );
}
