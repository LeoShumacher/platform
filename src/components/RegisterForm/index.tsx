"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const registerFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.string(),
  });

  const { register, handleSubmit } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  type RegisterFormSchema = z.infer<typeof registerFormSchema>;

  function handleRegisterSubmit(data: RegisterFormSchema) {
    console.log(data);
  }
  return (
    <div>
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="João Pereira"
                  {...register("name")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="joaopereira@gmail.com"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua XYZ Casa 1"
                  {...register("address")}
                />
              </div>
            </div>
            <Button type="submit">Sign up</Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Sign up</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
