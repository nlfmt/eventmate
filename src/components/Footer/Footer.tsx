import React from 'react'

import c from "./Footer.module.scss";

const Footer = () => {

  const year = 2023;
  const companyName = "EventMate";
  const contactMail = "info@eventmate.tech";

  return (
    <footer className={c.footer}>
      <p>&copy;{year} <br/> {companyName} <br/> {contactMail}</p>
    </footer>
  )
}

export default Footer



// class Footer {
//   private year: number;
//   private companyName: string;
//   private contactName: string;
//   private contactMail: string;


//   constructor(year: number, companyName: string, contactName: string, contactMail: string) {
//     this.year = year;
//     this.companyName = companyName;
//     this.contactName = contactName;
//     this.contactMail = contactMail;
//   }

//   render(): string {
//     return(
//       <footer>
//         <p>&copy; ${this.year}  ${this.companyName} ${this.contactName} ${this.contactMail}</p>
//       </footer>
//     );
//   }
// }

// const currentYear = new Date().getFullYear();
// const footer = new Footer(currentYear, "EventMate", "Nadine Eunous", "insertEMailHere@hdm-stuttgart.de");

// const footerHtml = footer.render();
// console.log(footerHtml);







