import React from "react";

const LogDisplay = () => {

return (
<div className="bg-black bg-opacity-80 rounded-md p-6 text-white overflow-y-auto" style={{ maxHeight: '300px' }}>
    <h1 className="mb-2 text-2xl">Logs</h1>
    <pre>
        [2024-12-06 17:29:39.723] Ticket added by - Vendor ID-1 - current size is 1 - ticket ID v1t1<br/>
        [2024-12-06 17:29:39.725] Ticket bought by - Customer ID-1 - current size is - 0 - Ticket is - Ticket ticketId=v1t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket added by - Vendor ID-2 - current size is 1 - ticket ID v2t1<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
        [2024-12-06 17:29:39.727] Ticket bought by - Customer ID-2 - current size is - 0 - Ticket is - Ticket ticketId=v2t1, eventName='Event', ticketPrice=1000<br/>
    </pre>
</div>

);
}

export default LogDisplay;
