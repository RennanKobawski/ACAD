"use client";
import { Button } from "@/app/_components/_ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/_ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/_ui/form";
import { Input } from "@/app/_components/_ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import TimeInput from "@/app/_components/_ui/time-input";
import { upsertTalonSchema } from "../_actions/upsert-talons/schema";
import { upsertTalon } from "../_actions/upsert-talons/upsert-talon";
import { z } from "zod";
import { Textarea } from "@/app/_components/_ui/textarea";
import { useState } from "react";

interface UpsertTalonDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  talonId?: number;
  setIsOpen: (isOpen: boolean) => void;
}

type FormSchema = z.infer<typeof upsertTalonSchema>;

// TODO: Verify if all these validations are working.
const validateTimesAndValues = (data: FormSchema) => {
  const isNextDay = (start: Date, end: Date) => {
    return (
      end.getDate() > start.getDate() ||
      (end.getDate() === start.getDate() + 1 && end.getHours() <= 5)
    );
  };

  if (data.startHour && data.endHour) {
    const startTime = data.startHour.getTime();
    const endTime = data.endHour.getTime();

    if (!(endTime > startTime || isNextDay(data.startHour, data.endHour))) {
      toast.error(
        "A Hora de Início deve ser menor que a Hora de Fim (até às 05h do dia seguinte é permitido)."
      );
      return false;
    }
  }

  if (
    data.startKm !== undefined &&
    data.endKm !== undefined &&
    data.startKm >= data.endKm
  ) {
    toast.error(
      "A Quilometragem Final deve ser maior que a Quilometragem Inicial."
    );
    return false;
  }

  if (data.startQar1 !== undefined && data.endQar1 !== undefined) {
    if (
      !(
        data.endQar1 > data.startQar1 ||
        isNextDay(data.startHour!, data.endHour!)
      )
    ) {
      toast.error(
        "O valor de Qar 1 Final deve ser maior que o valor de Qar 1 Inicial (com dia seguinte até 05h permitido)."
      );
      return false;
    }
  }

  if (data.startQar2 !== undefined && data.endQar2 !== undefined) {
    if (
      !(
        data.endQar2 > data.startQar2 ||
        isNextDay(data.startHour!, data.endHour!)
      )
    ) {
      toast.error(
        "O valor de Qar 2 Final deve ser maior que o valor de Qar 2 Inicial (com dia seguinte até 05h permitido)."
      );
      return false;
    }
  }

  return true;
};

const UpsertTalonDialog = ({
  isOpen,
  defaultValues,
  talonId,
  setIsOpen,
}: UpsertTalonDialogProps) => {
  const { data: session } = useSession();

  if (!session) {
    toast.error("Usuário não autenticado.");
  }

  const userId = session?.user?.id;

  const form = useForm<FormSchema>({
    resolver: zodResolver(upsertTalonSchema),
    defaultValues: defaultValues ?? {
      ht: undefined,
      vtr: undefined,
      responsible: "",
      startHour: undefined,
      endHour: undefined,
      startKm: undefined,
      endKm: undefined,
      percKm: undefined,
      startQar1: undefined,
      endQar1: undefined,
      startQar2: undefined,
      endQar2: undefined,
      note: "",
    },
  });

  const isUpdate = Boolean(talonId);

  const onSubmit = async (data: FormSchema) => {
    if (!userId) {
      toast.error("Usuário não autenticado.");
      return;
    }

    const timeValidationResult = validateTimesAndValues(data);
    if (!timeValidationResult) return;

    if (data.startKm !== undefined && data.endKm !== undefined) {
      const percKM = data.endKm - data.startKm;
      data.percKm = percKM;
    }

    await upsertTalon({
      ...data,
      id: talonId ?? 0,
    });

    toast.success(
      isUpdate ? "Talão atualizado com sucesso!" : "Talão criado com sucesso!"
    );
    setIsOpen(false);
    form.reset();
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    field.onChange(value ? parseInt(value, 10) : undefined);
  };

  const isQar1Filled = form.watch("startQar1") && form.watch("endQar1");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex flex-col justify-center rounded-lg max-w-[80%] max-h-[92%] sm:max-w-[600px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-lg sm:text-xl font-bold">
            {isUpdate ? "Atualizar" : "Criar"} Talão
          </DialogTitle>
          <DialogDescription className="font-semibold text-[#515151]">
            {isUpdate ? "" : "Insira as informações abaixo."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1 sm:gap-2"
          >
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="ht"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">HT</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        onChange={(e) => handleNumberInputChange(e, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vtr"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">VTR</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="responsible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Responsável</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">HI</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endHour"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">HF</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="startKm"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">KM Inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        onChange={(e) => handleNumberInputChange(e, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endKm"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">KM Final</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        onChange={(e) => handleNumberInputChange(e, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="startQar1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">Início QAR 1</FormLabel>
                    <FormControl>
                      <TimeInput
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endQar1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">Final QAR 1</FormLabel>
                    <FormControl>
                      <TimeInput
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isQar1Filled && (
              <div className="flex gap-10">
                <FormField
                  control={form.control}
                  name="startQar2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">Início QAR 2</FormLabel>
                      <FormControl>
                        <TimeInput
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endQar2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">Fim QAR 2</FormLabel>
                      <FormControl>
                        <TimeInput
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-sm">Observação</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[40px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="destructive_outline" className="py-2 sm:py-3">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-[40%] py-2 sm:py-3">
                {isUpdate ? "Atualizar" : "Adicionar"} talão
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTalonDialog;
