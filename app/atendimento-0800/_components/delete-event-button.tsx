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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja realmente deletar essa transação?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default DeleteEventButton;