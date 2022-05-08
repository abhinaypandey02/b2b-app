import firebase from '@react-native-firebase/auth'

export const htmlString = (props) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      rel="stylesheet"
    />
    <style>
      h1,
      p {
        margin-block-end: 0em;
        margin-block-start: 0em;
        font-family: "Poppins", sans-serif;
      }
      h2 {
        margin-block-end: 0em;
        margin-block-start: 0em;
        font-weight: 300;
        font-family: "Poppins", sans-serif;
      }
      h3 {
        margin-block-end: 0em;
        margin-block-start: 0em;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
      }
      h4,
      h5 {
        margin-block-end: 0em;
        margin-block-start: 0em;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
      }
      .heading {
        font-size: 25px;
        margin-bottom: 20px;
        background-color: #33cc00;
        padding: 5px;
        color: #fff;
      }
      .flex-container {
        flex-direction: row;
        display: flex;
        width: 90%;
        padding-left: 2vh;
        flex-grow: 1;
        justify-content: space-between;
      }
      .flex-container2 {
        flex-direction: row;
        display: flex;
        background-color: #f5f5f5;
        width: 95vw;
        margin-top: 30px;
        height: 40px;
      }
      .item1 {
        width: 40vw;
        padding-left: 2vw;
        transform: translateY(8px);
      }
      .item2 {
        width: 20vw;
        padding-left: 2vw;
        transform: translateY(8px);
      }
      .item3 {
        width: 10vw;
        padding-left: 2vw;
        transform: translateY(8px);
      }
      .item4 {
        width: 10vw;
        padding-left: 2vw;
        transform: translateY(8px);
      }
      .item5 {
        width: 10vw;
        padding-left: 2vw;
        transform: translateY(8px);
      }
      .flex-container3 {
        flex-direction: row;
        display: flex;
        border: 1px solid #f5f5f5;
        border-left-width: 1px;
        border-right-width: 1px;
        width: 95vw;
        height: 40px;
      }
      .padd-left {
        padding-left: 60vw;
        padding-top: 10vh;
      }
      .boldText {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div style="width: 100%; align-self: center">
      <div style="text-align: flex-start">
        <img
          style="height: 90px; width: 200px; object-fit: contain"
          src='https://firebasestorage.googleapis.com/v0/b/freshtables-5ca16.appspot.com/o/ft.png?alt=media&token=f73f7634-53bf-45aa-aeba-7fc2acb14814'
        />
        <div style="text-align: center">
          <h1 class="heading">Invoice</h1>
        </div>
        <div class="flex-container">
          <div>
            <h2>${props.shopName}</h2>
            <h2>Phone Number : ${firebase().currentUser.phoneNumber}</h2>
          </div>
          <div>
            <h4>Invoice Date : ${props.date}</h4>
            <h4>Payment Mode : Cash</h4>
          </div>
        </div>
        <div class="flex-container2">
          <div class="item1">
            <p>Items</p>
          </div>
          <div class="item2">
            <p>Quantity</p>
          </div>
          <div class="item3">
            <p>Price</p>
          </div>
          <div class="item4">
            <p>Total</p>
          </div>
        </div>
        ${props.product.map(
          (item2) =>
            `<div class="flex-container3">
                <div class="item1">
                   <p>${item2.productName} </p>
                </div>
                
                <div class="item2">
                <p>${item2.quantity.quantity}</p>
                </div>
                <div class="item3">
                <p>${item2.price}</p>
                </div>
                <div class="item4">
                <p>${item2.quantity.quantity * item2.price}</p>
                </div>
            </div>`
        )}
        <div class="padd-left">
        <p><span class="boldText">Subtotal : </span>Rs. ${props.price}</p>
        
         ${
           props.delieveryPrice
             ? `<p><span class="boldText">Delivery : </span>Rs. ${props.delieveryPrice}`
             : ``
         }</p>
          <p><span class="boldText">Total : </span>Rs. ${
            props.delieveryPrice
              ? props.price + props.delieveryPrice
              : props.price
          }</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
