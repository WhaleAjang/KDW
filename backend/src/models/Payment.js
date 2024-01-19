const { default: mongoose } = require("mongoose");
const paymentSchema = mongoose.Schema({
    user: {
        type: "object",
    },
    data: {
        type: Array,
        default: [],
    },
    product: {
        type: Array,
        default: [],
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
