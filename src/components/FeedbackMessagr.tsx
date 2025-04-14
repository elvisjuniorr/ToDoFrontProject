import './FeedbackMessage.css'
import { TbXboxX } from "react-icons/tb";

export interface FeedbackMessageProps {
    message: string;
    closeMessage: () => void;
}

export function FeedbackMessage({ message, closeMessage }: FeedbackMessageProps) {
    return (
      <div className='feedbackMessage'>
        <p>{message}</p>
        <button onClick={closeMessage}><TbXboxX className='feedbackMessageButton'/></button>
      </div>
    );
  }