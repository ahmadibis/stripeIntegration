const stripe = require('stripe')(process.env.STRIPE_KEY)


const stripeController = async (req, res) => {
  //we communicate with db for the correct price
  // always verify the value coming from front end the list and then communicate with the db to get the actual price to be sure
  //this is just  a demo in a real project you want to ensure you communicate with db to verify cos a client can easily mess with the pricw on front end
  const { purchase, total_amount, shipping_fee } = req.body;

    //once we get it we calculate the total 
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  //your payment intent which goes to stripe for confirmation
  // so we need the payment intent and create method from stripe , and send to stripe 
    //and wait for stripe to send us a client_Secret which our client will use to complete the payment and that is how we can establish a payment with stripe 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;