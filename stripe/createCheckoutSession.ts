import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export async function createCheckoutSession(uid: string, priceId: string) {
  const firestore = firebase.firestore();

  const checkoutSessionRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const data = snap.data();
    const sessionId: string | undefined = data?.sessionId;
    const stripe = await loadStripe(
      "pk_test_51MzemGLXOr0D0CNbXpvx8yImPeOduzPaOKBuR8ecN2VHA6FWMr5U5XxQpnmhr9rIZaWHVchs1MNsQieNRrA0VxR9008c335SWR"
    );
    if (stripe && sessionId) {
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
