import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/app/_components/_ui/alert-dialog";
  import { Button } from "@/app/_components/_ui/button";
  import { TrashIcon } from "lucide-react";
  import { deleteEvent } from "../_actions/delete-event/delete-event";
  import { toast } from "sonner";
  
  interface DeleteEventButtonProps {
    eventId: number;
  }
  
  const DeleteEventButton = ({
    eventId,
  }: DeleteEventButtonProps) => {
    const handleConfirmDeleteClick = async () => {
      try {
        await deleteEvent({ eventId });
        toast.success("Transação deletada com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao deletar a transação.");
      }
    };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col max-w-[80%] sm:w-[600px]">
          <AlertDialogHeader className="flex flex-col gap-1 text-center">
            <AlertDialogTitle className="text-xl">
              Você deseja realmente deletar essa transação?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-semibold text-destructive">
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center items-center">
            <AlertDialogCancel className="w-[50%] sm:w-[30%]">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick} className="w-[50%] sm:w-[30%]">
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default DeleteEventButton;