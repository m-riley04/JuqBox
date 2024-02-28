import { Guest } from "../../../netlify/functions/rooms";
import GuestListItem from "./GuestListItem";

interface GuestListProps extends React.HTMLProps<HTMLDivElement> {
    guests?: Guest[];
}

const GuestList : React.FC<GuestListProps> = ({ guests, ...divProps } : { guests?: Guest[] }) => {
    return (
        <div {...divProps}>
            {guests?.map((guest, index) => <GuestListItem key={index} guest={guest}/>)}
        </div>
    );
}

export default GuestList;