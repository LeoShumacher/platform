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
import { usePhoneInputMask } from "./phoneInputMask";

export default function RegisterForm() {
  const { handlePhoneMask } = usePhoneInputMask();

  const registerFormSchema = z.object({
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Formato de email inválido")
      .toLowerCase()
      .refine((email) => {
        return email.endsWith("@gmail.com");
      }, 'O email deve terminar com "@gmail.com"'),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "A senha deve conter no mínimo 8 dígitos"),
    address: z.string().nonempty("O endereço é obrigatório"),
    phone_number: z.string().min(14, "Número de telefone incompleto"),
  });
  type RegisterFormSchema = z.infer<typeof registerFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  function handleRegisterSubmit(data: RegisterFormSchema) {
    const cleanedPhone = data.phone_number.replace(/\D/g, "");
    const finalData = {
      ...data,
      phone_number: cleanedPhone,
    };

    console.log(finalData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Card className="w-[350px]">
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
                {errors.name && <span>{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joaopereira@gmail.com"
                  {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Telefone</Label>
                <Input
                  id="phone_number"
                  placeholder="(21) 91111-1111"
                  {...register("phone_number")}
                  onChange={handlePhoneMask}
                />
                {errors.phone_number && (
                  <span>{errors.phone_number.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua XYZ Casa 1"
                  {...register("address")}
                />
                {errors.address && <span>{errors.address.message}</span>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Sign up</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
