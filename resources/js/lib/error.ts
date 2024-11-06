import { toast } from "sonner";


export const showError = (error: any) => {
    toast("Whoopsss....", {
        description: JSON.stringify(error),
        important: true,
    });
}