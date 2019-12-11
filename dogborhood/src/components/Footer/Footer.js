import React from 'react';

import './Footer.css';


const Footer = () => {
    return (
        <>
        <footer class="footer">
            <section class="social">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-twitter-square"></i>
                <i class="fab fa-google-plus-square"></i>
            </section>
            <small><p>&copy; <span id="year"></span> Acme Inc.</p></small>
        </footer>

        </>
    )
}

export default Footer;