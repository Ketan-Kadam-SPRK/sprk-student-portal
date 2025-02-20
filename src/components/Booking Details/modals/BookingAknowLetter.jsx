import React, { useRef, useEffect, useState, forwardRef } from "react";
import { Image } from "cloudinary-react";
import "./BookingAk.css";
import { useDispatch, useSelector } from "react-redux";
import { ToWords } from "to-words";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Backdrop,
  CircularProgress,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
// import { usePDF } from "react-to-pdf";
import FormatDate from "../../../Utils/FormatDate";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import Styles from "./booking.module.css";
import { getBookingConfirmation } from "../action/Payment.action";

const tableStyle = {
  border: "1px solid black",
  py: "5px", // Padding on the Y-axis
  px: 1, // Padding on the X-axis
  fontSize: "12px",
  fontWeight: "bold",
  width: "200px",
};

const tableStyle2 = {
  border: "1px solid black",
  py: "5px", // Padding on the Y-axis
  px: 1, // Padding on the X-axis
  fontSize: "12px",
};

const textStyle = {
  mt: 1, // Margin on the top
  fontSize: "14px",
};

const BookingAknowLetter = forwardRef(
  ({ handleDetailModal, booking_uid }, ref) => {
    const headers = useAuthHeaders();
    // const data = useSelector((state) => state.booking.bookingAkData);
    const dispatch = useDispatch();
    // const [bookingData, setBookingData] = useState(null);
    const toWords = new ToWords();
    const [loading, setLoading] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
      fetchBookingData();
    }, [booking_uid]);

    const fetchBookingData = async () => {
      setLoading(true);
      await dispatch(getBookingConfirmation({ headers, booking_uid }))
        .then((res) => {
          const data = res?.payload?.data.data;
          setLoading(false);
          setBookingData(data);
        })
        .catch((err) => {
          setLoading(false);
        });
    };

    const printRef = useRef();

    const handlePrint = useReactToPrint({
      contentRef: printRef, // Pass the ref directly to contentRef
      documentTitle: `Sprk_Booking_Acknowledgment_${bookingData?.booking_code}`,
    });

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "p") {
          event.preventDefault(); // Prevent the default browser print dialog
          handlePrint(); // Trigger the print function from useReactToPrint
          // handlePrintReceipt();
        }
      };

      // Add an event listener to the document to listen for Ctrl + P
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        // Remove the event listener when the component unmounts
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [handlePrint]);

    // const { targetRef } = usePDF({
    //   filename: `sprk_booking_aknowledgement-${new Date().toISOString()}.pdf`,
    // });

    const courseNames = bookingData?.booked_course?.map(
      (course) => course.course_group_name
    );

    let totalFees = bookingData?.total_fees;

    const joinedNames = courseNames?.join(", "); // Join course names into a string

    // const paidPayments =
    //   .map((res) => ({
    //     ...res,
    //     balance: res.paid_amount,
    //   }));

    const paidPayments = bookingData?.payments
      ?.filter((payment) => payment.installment_status === "PAID")
      ?.map((payment) => {
        const paidAmount = payment.paid_amount || 0;
        totalFees -= paidAmount; // Update the remaining balance
        return {
          ...payment,
          balance: totalFees,
        };
      });

    // Calculate total paid amount
    const totalPaidAmount =
      paidPayments?.reduce(
        (total, payment) => total + (payment.paid_amount || 0),
        0
      ) || 0;

    // Convert total paid amount to words
    const totalPaidAmountInWords = toWords?.convert(totalPaidAmount);

    const totalBalance = bookingData?.generated_credits || 0;

    const totalBalanceInWords = toWords?.convert(totalBalance);
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return (
      <>
        <DialogTitle>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "flex-end",
              overFlow: "auto",
              // position: "sticky",
              // top: "0px",
              // right: "0px",
              backgroundColor: "#263238",
              width: "100%",
              "@media print": {
                display: "none",
              },
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handlePrint();
                setTimeout(() => {
                  handleDetailModal();
                }, 1000);
              }}
              sx={{
                px: 3,
                color: "white",
                // backgroundColor:'#414D54'
              }}
            >
              Print
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleDetailModal();
              }}
              sx={{
                px: 3,
                ml: 2,
                fontWeight: "600",
                backgroundColor: "white",
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box ref={printRef} sx={{ minWidth: "600px" }}>
            <table className="printTable">
              <thead className="header">
                <tr>
                  <td colSpan="2">
                    <Image
                      style={{ width: "180px" }}
                      publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1690809251/sprk-logoRR_isa0xp.svg"
                      cloudName="dxlzzgbfw"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Office Address :
                      </span>{" "}
                      SPRK Technologies, Office no: 102-105, 1st floor, Royal
                      Palace, Sector-2, Plot no.11, Opp. Glomax Mall, Kharghar,
                      Navi Mumbai, Maharashtra, India, Telephone - 9082572832
                    </Typography>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <Box
                      sx={{
                        borderTop: "1px solid black",
                        borderBottom: "1px solid black",
                        py: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Booking Confirmation
                      </Typography>
                    </Box>
                  </td>
                </tr>
              </thead>
              <tbody className="mainDiv page-break">
                <tr>
                  <td colSpan="2">
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "600", mt: 1 }}
                    >
                      STUDENT DETAILS
                    </Typography>
                    <Table sx={{ maxHeight: 400, mt: 1, borderRadius: "3px" }}>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>
                            {" "}
                            Student ID
                          </TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {bookingData?.student.student_code}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>BCN</TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {bookingData?.booking_code}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>
                            Enrollment Date
                          </TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {FormatDate(bookingData?.booked_at)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>
                            Student Name
                          </TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {bookingData?.student?.student_name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>Address</TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {bookingData?.student?.student_address}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>
                            Course Enrolled{" "}
                          </TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {joinedNames}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}>
                            Total Fee
                          </TableCell>
                          <TableCell sx={{ ...tableStyle2 }}>
                            {`Rs. ${bookingData?.total_fees?.toLocaleString(
                              "en-IN"
                            )}`}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "600", mt: 2 }}
                    >
                      COURSE DETAILS
                    </Typography>
                    <Table sx={{ maxHeight: 400, mt: 1, borderRadius: "3px" }}>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              ...tableStyle2,
                              maxWidth: "50px",
                              width: "50px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            Sr.no
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableStyle2,
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            Course Name{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid black",
                              fontSize: "12px",
                              fontWeight: "600",
                              py: "1px",
                              px: 1,
                            }}
                          >
                            {" "}
                            Modules{" "}
                          </TableCell>
                        </TableRow>
                        {bookingData?.booked_course?.length > 0 &&
                          bookingData?.booked_course?.map(
                            (courseGroup, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  height: "100%",
                                  border: "1px solid black",
                                }}
                              >
                                <TableCell
                                  sx={{
                                    ...tableStyle2,
                                    maxWidth: "50px",
                                    width: "50px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    height: "100%",
                                    borderBottom: "none",
                                  }}
                                >
                                  {index + 1}
                                </TableCell>

                                <TableCell
                                  sx={{
                                    ...tableStyle,
                                    height: "100%",
                                    borderBottom: "none",
                                  }}
                                >
                                  {courseGroup?.course_group_name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "12px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                    padding: "10px",
                                    height: "100%",
                                    borderBottom: "none",
                                  }}
                                >
                                  {courseGroup?.courses
                                    ?.slice() // Create a shallow copy to avoid mutating the original array
                                    .sort((a, b) => a.course_id - b.course_id) // Sort in ascending order based on course_id
                                    .map((course, tIndex) => (
                                      <div
                                        key={tIndex}
                                        style={{
                                          padding: "3px 5px",
                                          borderRadius: "20px",
                                          backgroundColor: "white",
                                          color: "black",
                                          border: "1px solid black",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {course}
                                      </div>
                                    ))}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "600", mt: 2 }}
                    >
                      PAYMENT DETAILS
                    </Typography>
                    <Table
                      sx={{
                        maxHeight: 400,
                        borderRadius: "3px",
                        marginTop: "10px",
                      }}
                    >
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ ...tableStyle }}> Sr. No.</TableCell>
                          <TableCell sx={{ ...tableStyle }}>
                            {" "}
                            Receipt No.
                          </TableCell>
                          <TableCell sx={{ ...tableStyle }}>
                            {" "}
                            Payment Date
                          </TableCell>
                          <TableCell sx={{ ...tableStyle }}>
                            {" "}
                            Amount Paid (In INR)
                          </TableCell>
                          <TableCell sx={{ ...tableStyle }}>
                            {" "}
                            Amount Balance (In INR)
                          </TableCell>
                        </TableRow>
                        {paidPayments && paidPayments?.length > 0 ? (
                          paidPayments?.map((payment, index) => {
                            return (
                              <TableRow key={index + 1}>
                                <TableCell sx={{ ...tableStyle2 }}>
                                  {index + 1}
                                </TableCell>
                                <TableCell sx={{ ...tableStyle2 }}>
                                  {payment?.receipt_code}
                                </TableCell>
                                <TableCell sx={{ ...tableStyle2 }}>
                                  {FormatDate(payment?.paid_at)}
                                </TableCell>
                                <TableCell sx={{ ...tableStyle2 }}>
                                  {payment?.paid_amount
                                    ? `Rs. ${payment?.paid_amount?.toLocaleString()}`
                                    : ""}
                                </TableCell>
                                <TableCell sx={{ ...tableStyle2 }}>
                                  {`Rs. ${Math.ceil(
                                    payment.balance
                                  )?.toLocaleString()}`}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          // Display an empty row with "-" in all fields
                          <TableRow>
                            <TableCell sx={{ ...tableStyle2 }}>-</TableCell>
                            <TableCell sx={{ ...tableStyle2 }}>-</TableCell>
                            <TableCell sx={{ ...tableStyle2 }}>-</TableCell>
                            <TableCell sx={{ ...tableStyle2 }}>-</TableCell>
                            <TableCell sx={{ ...tableStyle2 }}>-</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <Typography sx={{ marginTop: "10px" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Total Amount Paid (In INR)
                      </span>{" "}
                      is Rs. {totalPaidAmount?.toLocaleString()} (
                      {totalPaidAmountInWords?.charAt(0).toUpperCase() +
                        totalPaidAmountInWords?.slice(1)}{" "}
                      only)
                    </Typography>
                    {totalBalance !== 0 && (
                      <Typography sx={{ marginTop: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Total Generated Credit (In INR)
                        </span>{" "}
                        is Rs. {totalBalance?.toLocaleString()} (
                        {totalBalanceInWords?.charAt(0).toUpperCase() +
                          totalBalanceInWords?.slice(1)}{" "}
                        only)
                      </Typography>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="courseDetail" colSpan="2">
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "600", mt: 2 }}
                    >
                      CODE OF CONDUCT
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      1. SPRK Technologies is not an university and does not
                      award degrees/diplomas.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      2. After the module/course completion, it is mandatory for
                      the student to submit their project on time.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      3. Minimum 70% attendance is mandatory to get the
                      certificate.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      4. Prior information to the institute is mandatory in case
                      of any leave.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      5. SPRK TECHNOLOGIES do not claim 100% guarantee about the
                      placement.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      6. The amount once paid is non-refundable.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      7. Goods & Service Tax is not charged on the services
                      provided by SPRK Technologies to Students. Hence SPRK
                      Technologies is not liable to provide Tax invoice.
                    </Typography>
                    <Typography sx={{ ...textStyle }}>
                      8. In RBC, the payment should be equal to or greater than
                      the previous course fees paid. If the payment is less, no
                      refund will be issued.
                    </Typography>
                    {bookingData?.rbc === true && (
                      <Typography sx={{ ...textStyle }}>
                        9. RBC would be applied in the context of transitioning
                        from a previous “{bookingData?.previous_course}” course
                        to a new “{bookingData?.new_course}” course.
                      </Typography>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot className="footer">
                <tr>
                  {/* <td colSpan="2" >
                <Typography sx={{ fontSize: "12px", mt: 2, mb:1, textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}> Office Address :</span> SPRK Technologies, Office no: 102-105, 1st floor, Royal Palace, Sector-2, Plot no.11, Opp. Glomax Mall, Kharghar, Navi Mumbai, Maharashtra, India, Telephone - 9082572832
                </Typography>
              </td> */}
                </tr>
              </tfoot>
            </table>
          </Box>
        </DialogContent>
      </>
    );
  }
);

export default BookingAknowLetter;
