import { formatTime } from "@/lib/format"
import { useEffect, useState } from "react";

type CountdownProps = {
    time: number;
    onTimeUp: () => void;
}

export const Countdown = ({ time, onTimeUp }: CountdownProps) => {

    const [timeLeft, setTimeLeft] = useState(time);


    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime: any) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <div className="px-4 py-2 border flex flex-col items-center justify-center" >
            {formatTime(timeLeft)}
        </div>
    )

}