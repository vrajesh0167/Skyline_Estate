import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ listing, setProgress }) {
    const [landlord, setLandload] = useState(null);
    // console.log(landlord);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetxhLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    return;
                }
                setLandload(data);
            } catch (error) {
                console.log(error);
            } finally {
                setProgress(100);
            }
        }

        setProgress(10);

        fetxhLandlord();
    }, [listing.userRef, setProgress])
    return (
        <div>
            {
                landlord && (
                    <div className=' flex flex-col gap-4'>
                        <p className=' text-xl text-slate-600 font-semibold'>Contact <span className=' font-bold'>{landlord.username}</span> for <span className=' font-bold'>{listing.Name}</span></p>
                        <textarea name="message" id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className=' w-full p-3 text-lg font-semibold text-slate-600' placeholder='Enter your message here...'></textarea>
                        <Link to={`mailto:${landlord.email}?subject=Regarding${listing.Name}&body=${message}`}>
                            <button className=' bg-sky-600 p-3 w-full border-2 border-sky-600 rounded-lg text-white font-semibold text-xl hover:bg-white hover:text-sky-600 transition-all'>Send Message</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
