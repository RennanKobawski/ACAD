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

const validateTimesAndValues = (data: FormSchema) => {
  if (
    data.startHour &&
    data.endHour &&
    data.startHour.getTime() >= data.endHour.getTime()
  ) {
    toast.error("A Hora de Início deve ser menor que a Hora de Fim.");
    return false;
  }

  if (
    data.startKm !== undefined &&
    data.endKm !== undefined &&
    data.startKm <= data.endKm
  ) {
    toast.error(
      "A Quilometragem Inicial deve ser maior que a Quilometragem Final."
    );
    return false;
  }

  if (
    data.startQar1 !== undefined &&
    data.endQar1 !== undefined &&
    data.startQar1 <= data.endQar1
  ) {
    toast.error(
      "O valor de Qar1 Inicial deve ser maior que o valor de Qar1 Final."
    );
    return false;
  }

  if (
    data.startQar2 !== undefined &&
    data.endQar2 !== undefined &&
    data.startQar2 <= data.endQar2
  ) {
    toast.error(
      "O valor de Qar2 Inicial deve ser maior que o valor de Qar2 Final."
    );
    return false;
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
      id: talonId,
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
  const [endKm, setEndKm] = useState<number | string>(0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex flex-col justify-center rounded-lg max-w-[80%] sm:max-w-[600px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-xl font-bold">
            {isUpdate ? "Atualizar" : "Criar"} Talão
          </DialogTitle>
          <DialogDescription className="font-semibold text-[#515151]">
            Insira as informações abaixo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
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
                        onChange={(e) => setEndKm(e.target.value)}
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
                <FormItem>
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
                <Button type="button" variant="destructive_outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-[40%]">
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
