import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6 px-4 py-2">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>Brr: {orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white capitalize ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-semibold text-primary">
              Order Details
            </div>
            <ul className="grid gap-4">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm"
                  >
                    <div className="flex-1">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                        📦 {item.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-600 dark:text-gray-300">
                        <p>
                          🔢 Qty:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p>
                          💲 Price:{" "}
                          <span className="font-medium">Brr-{item.price}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items in the order.</p>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 shadow-sm space-y-2 text-sm">
            <div className="text-lg font-semibold text-primary flex items-center gap-2">
              🛫 Shipping Information
            </div>
              <div className="flex items-center gap-2">
                👤 <span className="font-medium">Name:</span>{" "}
                {user?.userName || "N/A"}
              </div>
              <div className="flex items-center gap-2">
                📍 <span className="font-medium">Address:</span>{" "}
                {orderDetails?.addressInfo?.address || "N/A"}
              </div>
              <div className="flex items-center gap-2">
                🏙️ <span className="font-medium">City:</span>{" "}
                {orderDetails?.addressInfo?.city || "N/A"}
              </div>
              <div className="flex items-center gap-2">
                🧾 <span className="font-medium">Pincode:</span>{" "}
                {orderDetails?.addressInfo?.pincode || "N/A"}
              </div>
              <div className="flex items-center gap-2">
                📞 <span className="font-medium">Phone:</span>{" "}
                {orderDetails?.addressInfo?.phone || "N/A"}
              </div>
              {orderDetails?.addressInfo?.notes && (
                <div className="flex items-start gap-2">
                  📝 <span className="font-medium">Notes:</span>
                  <span className="text-muted-foreground">
                    {orderDetails.addressInfo.notes}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
  <div className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
    🔄 Update Order Status
  </div>

  <CommonForm
    formControls={[
      {
        label: "Choose New Status",
        name: "status",
        componentType: "select",
        options: [
          { id: "pending", label: "🕒 Pending" },
          { id: "inProcess", label: "⚙️ In Process" },
          { id: "inShipping", label: "🚚 In Shipping" },
          { id: "delivered", label: "✅ Delivered" },
          { id: "rejected", label: "❌ Rejected" },
        ],
        hint: "Update the order progress based on current fulfillment stage.",
      },
    ]}
    formData={formData}
    setFormData={setFormData}
    buttonText={"Save Status"}
    onSubmit={handleUpdateStatus}
    className="space-y-4"
  />
</div>

      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
