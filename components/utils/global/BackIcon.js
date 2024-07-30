import { useRouter } from 'next/router';
import React from 'react'

function BackIcon() {
    // const history = useHistory();
    // const navigate = useNavigate();
    const router = useRouter();

    const handleClickBack = (e) => {
      e.preventDefault();
      e.stopPropagation();
    //   navigate.goBack();
      router.back();
    };
    return (
        <>
            <button type='button' className='go-bac' onClick={handleClickBack}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14l-4 -4l4 -4" />
                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                </svg>
            </button>
        </>
    )
}

export default BackIcon