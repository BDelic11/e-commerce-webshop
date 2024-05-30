import { getExtendedUser } from "@/actions/user";
import CheckoutAddressForm from "../checkout-address-form";
import { Button } from "./button";
import CustomDialog from "./custom-dialog";

interface CheckoutContainerProps {
  title: string;
  userId?: string;
  FormSent?: boolean;
  action?: any;
  children: React.ReactNode;
  classname?: string;
}

const CheckoutContainer = async ({
  title,
  userId,
  FormSent,
  action,
  children,
  classname,
}: CheckoutContainerProps) => {
  const { data: extendedUser, error } = await getExtendedUser(userId);
  if (error) {
    return { error };
  }

  return (
    <section className={`${classname} md:p-6 bg-white rounded-sm shadow-md`}>
      <div className="flex flex-row justify-between px-1">
        <h2 className="md:font-semibold md:text-2xl md:mb-5 ">{title}</h2>
        {action && userId && FormSent ? (
          <CustomDialog
            trigger="Promijeni"
            action={action}
            header="Dodatne informacije o narudžbi"
          >
            <CheckoutAddressForm
              userCity={extendedUser?.city}
              userAddress={extendedUser?.address}
              userCountry={extendedUser?.country}
              userPostalCode={extendedUser?.postalCode}
              userPhoneNumber={extendedUser?.phoneNumber}
              userId={userId}
            />
            {/* <Button
              size="sm"
              variant="secondary"
              onClick={() => action(userId)}
            >
              Promijeni
            </Button> */}
          </CustomDialog>
        ) : (
          <Button size="sm" variant="secondary">
            Nema radnje
          </Button>
        )}
      </div>
      <div className="px-1">{children}</div>
    </section>
  );
};

export default CheckoutContainer;
