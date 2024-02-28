import { Guest } from "../../../netlify/functions/rooms";

function GuestListItem({ guest } : { guest?:Guest }) {
    

    return (
        <>
            <p>{guest?.name}</p>
            <p>Queues: {guest?.queues_total}</p>
        </>
    );
}

export default GuestListItem;