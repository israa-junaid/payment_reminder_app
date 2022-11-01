import { Paper } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../components/MUTable/MaterialTableIcons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import editIcon from "../../images/table/edit.svg";
import deleteIcon from "../../images/table/delete.svg";
import reactivateIcon from "../../images/table/reactivate.svg";
import React, { useState, useRef, useReducer } from "react";
import { userSchema } from "../../components/Validation/SuperAdmin/ComplainSchema";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import Modal from "../../components/Modal";
import FormInputField from "../../components/FormInputField";
import FormTextArea from "../../components/FormTextArea";
import ArrowButton from "../../components/MaterialTableButtons/ArrowButton";
import DeleteButton from "../../components/MaterialTableButtons/DeleteButton";
import ReEnableButton from "../../components/MaterialTableButtons/ReEnableButton";
import EditButton from "../../components/MaterialTableButtons/EditButton";
import { onMessageListener } from "../../firebaseInit";
const Payments = (props) => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState({
    userId: {
      username: "",
    },
    status: "",
    description: "",
    title: "",
    _id: "",
    dueDate: "",
    createdAt: "",
  });
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  // For refreshing table
  const tableRef = useRef();

  //For rerendering
  const refreshTable = () => {
    tableRef.current.onQueryChange();
  };
  // ? adding notificationsss
  onMessageListener()
    .then((payload) => {
      const { title, body } = payload.data;
      // toast.info(`${title}; ${body}`);
      console.log("Title is ---",body)
      // toast.success(`${title}; ${body}`);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                {title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                {body}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))
    })
  // const forceUpdate = React.useReducer((bool) => !bool)[1];

  //For form
  const methods = useForm({
    resolver: yupResolver(userSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const viewComplaint = (rowData) => {
    setSelectedUser(rowData);
    setViewModal(true);
  };
  const removeEmpty = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "" || obj[key] == null) {
        delete obj[key];
      }
    });
    return obj;
  };
  const deleteUser = (rowData) => {
    setSelectedUser(rowData);
    setDeleteModal(true);
  };

  const editUser = (rowData) => {
    setSelectedUser(rowData);
    setEditModal(true);
  };
  const HandleUnpaidForm = (data) => {
    if (!disabled) {
      setDisabled(true);
      setError();

      data["status"] = "Unpaid";

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}/status`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          setModal(false);
          reset();
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setModal(false);
          
          return Promise.reject();
        });
      console.log("promise---",promise)
      toast.promise(promise, {
        loading: "Loading",
        success: "Payment status updated",
        error: "An error has occurred",
      });
    }
  };

  const HandlePaidForm = (data) => {
    if (!disabled) {
      setDisabled(true);
      setError();

      data["status"] = "Paid";
    

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}/status`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
       
          setDisabled(false);
          reset();
          setModal(false);
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setModal(false);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Payment status updated",
        error: "An error has occurred",
      });
    }
  };

  const approveRequest = (data) => {
    if (!disabled) {
      setDisabled(true);
      setError();

      const data = {
        status: "Paid",
      };

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}/status`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          setDisabled(false);
          setViewModal(false);
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setModal(false);
       
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Complain status updated",
        error: "An error has occurred",
      });
    }
  };

  const rejectRequest = (data) => {
    if (!disabled) {
      setDisabled(true);
      setError();

      const data = {
        status: "Unpaid",
      };

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}/status`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          setViewModal(false);
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setModal(false);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Payment status updated",
        error: "An error has occurred",
      });
    }
  };

  const HandleEditForm = (data) => {
   

    if (!disabled) {
      setDisabled(true);

      setError();

      //removing empty strings
      const newData = removeEmpty(data);
      console.log(newData);
      let formData = new FormData();

      // appending data into formdata
      Object.keys(newData).forEach((key) => formData.append(key, newData[key]));

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: formData,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          reset();
          setEditModal(false);
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          console.log(err);
          setDisabled(false);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Payment Updated",
        error: "An error has occurred",
      });
    }
  };

  const HandleDeleteForm = () => {
    setDeleteModal(false);
    if (!disabled) {
      setDisabled(true);

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment/${selectedUser._id}/delete`,
        method: `${selectedUser.status === "Paid" ||selectedUser.status === "Unpaid" ? "PUT" : "PUT"}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);

          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Payment Deleted ",
        error: "An error has occurred",
      });
    }
  };

  const HandleForm = (data) => {
    console.log(data);

    if (!disabled) {
      setDisabled(true);
      setError();

      //removing empty strings
      const newData = removeEmpty(data);
      console.log("SAVED CALLED")
      console.log(newData);
      let formData = new FormData();

      // appending data into formdata
      Object.keys(newData).forEach((key) => formData.append(key, newData[key]));

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/payment`,
        method: "POST",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: formData,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          setModal(false);
          reset();
          refreshTable();
        })

        // Catch errors if any
        .catch((err) => {
          setError(err.response.data.error);
          setDisabled(false);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Payment Added ",
        error: "An error has occurred",
      });
    }
  };



  const columns = [
    // {
    //   title: "",
    //   field: "image",
    //   filtering: false,
    //   render: (rowData) => (
    //     <img
    //       src={
    //         rowData.image === "no-image.jpg"
    //           ? profile
    //           : `${process.env.REACT_APP_BASEURL}/uploads/offices/${rowData.image}`
    //       }
    //       className="w-12 rounded-full"
    //     />
    //   ),
    // },
    { title: "Title", field: "title", filtering: false },
    {
      title: "DUE DATE",
      filtering: false,
      field: "dueDate",
      render: (rowData) => rowData.dueDate && rowData.dueDate.slice(0, 10),
    },
    {
      title: "CREATED AT",
      filtering: false,
      field: "createdAt",
      render: (rowData) => rowData.createdAt && rowData.createdAt.slice(0, 10),
    },
    {
      title: "STATUS",
      field: "status",
      lookup: {
        Resolved: "Paid",
        Pending: "Unpaid",
        Rejected: "Deleted",
      },

      render: (rowData) => (
        <div
          style={
            rowData.status == "Unpaid"
              ? {
                  border: "1px solid #CAB81B",
                  borderRadius: "5px",
                  color: "#CAB81B",
                  width: "6rem",
                  padding: "3px",
                  textAlign: "center",
                }
              : "" + rowData.status == "Paid"
              ? {
                  border: "1px solid #448B43",
                  borderRadius: "5px",
                  color: "#448B43",
                  width: "6rem",
                  padding: "3px",
                  textAlign: "center",
                }
              : "" + rowData.status == "Deleted"
              ? {
                  border: "1px solid #8B4343",
                  borderRadius: "5px",
                  color: "#8B4343",
                  width: "6rem",
                  padding: "3px",
                  textAlign: "center",
                }
              : ""
          }
        >
          {rowData.status}
        </div>
      ),
    },
  ];

  return (
    <main className="content-container">
      <div className="py-7 px-8 bg-white shadow-2xl rounded-2xl">
      <div className="flex flex-col  gap-6 mb-4 md:absolute z-10 right-10">
          <button
            onClick={() => setModal(true)}
            className="py-4 px-10 bg-blue-600 text-white font-thin rounded-xl"
          >
            Add Payment
          </button>
        </div>
        <MaterialTable
          tableRef={tableRef}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
            Toolbar: (props) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginLeft: "-58px",
                  marginBottom: "20px",
                }}
              >
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          icons={tableIcons}
          title=""
          columns={columns}
          options={{
            filtering: false,
            searchFieldStyle: {
              border: "1px solid #CCCCCC ",
              padding: "8px",
              borderRadius: "10px",
            },
            debounceInterval: 700,
            headerStyle: {
              fontWeight: "bold",
              fontSize: "15px",
              textTransform: "uppercase",
            },
            rowStyle: {
              borderBottom: "null",
            },
            search: true,
            sorting: false,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <ArrowButton />,
              onClick: (event, rowData) => {
                viewComplaint(rowData);
              },
            },
            {
              icon: () => <EditButton />,
              onClick: (event, rowData) => {
                reset();
                editUser(rowData);
                setEditForm(false);
              },
            },
            (rowData) => ({
              icon: () =>
                rowData.status === "Paid" ||rowData.status ==="Unpaid" ? (
                  <DeleteButton />
                ) : (
                 ""
                ),

              onClick: (event, rowData) => {
                reset();
                deleteUser(rowData);
              },
            }),
          ]}
          data={(query) =>
            new Promise((resolve, reject) => {
              var myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
              myHeaders.append(
                "Authorization",
                `Bearer ${localStorage.getItem("token")}`
              );

              var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
              };
              let url = `${process.env.REACT_APP_BASEURL}/api/v1/payment?`;

              if (query.filters.length) {
                const filter = query.filters.map((filter) => {
                  if (filter.value[0] && filter.value.length == 1)
                    return `&${filter.column.field}${filter.operator}${filter.value[0]}`;
                });
                url += filter.join("");
              }

              if (query.search) {
                url += "&title=" + query.search;
              }
              url += "&limit=" + query.pageSize;
              url += "&page=" + (query.page + 1);

              console.log("page", parseInt(query.page));
              fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  console.log("apicall", result.data);
                  resolve({
                    data: result.data,
                    page: query.page,
                    totalCount: result.total,
                  });
                })
                .catch((error) => console.log("error", error));
             
            })
          }
        />
      </div>

 {/* Add Payment Modal */}
 <Modal
        show={modal}
        close={() => {
          setModal(false);
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(HandleForm)}
            className="flex flex-col gap-6 justify-center align-center"
          >
           
            {/* <input
              type="file"
              {...register("file")}
              onChange={(e) => console.log(e.target.files)}
            /> */}

            <div>
              <h2 className="text-lg font-bold mb-2">Enter Payment Details</h2>

              <div className="grid grid-cols-2 gap-4">
                
                <FormInputField name={"title"} placeholder="Payment Title*" />
               
               
                 <FormInputField
                  required
                  placeholder="Due Date"
                  type="date"
                  id="dueDate"
                   onFocus={(e) => (e.target.type = "date")}
                   onBlur={(e) => (e.target.type = "text")}
                  name={"dueDate"}
                  size="30"
                />
               
              </div>
              <FormTextArea className="mt-3" name={"description"} placeholder={"Description"} />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <input
                onClick={() => setModal(false)}
                type="button"
                value="Cancel"
                className="red p-3 rounded-lg text-white cursor-pointer"
              />
              <input
                type="submit"
                value="Save"
                className="grey p-3 rounded-lg text-white cursor-pointer"
              />
            </div>
          </form>
        </FormProvider>
      </Modal>
      {/* View payment */}
      <Modal
        className="w-4/5  md:w-2/5 h-3/4 h-fit"
        show={viewModal}
        close={() => {
          setViewModal(false);
        }}
      >
        <div className=" p-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div>
                <h2 className="text-xl font-bold ">
                  {selectedUser.title}
                </h2>
              </div>
            </div>

            <div>
              <h3
                className={`px-5 py-2 border text-base rounded-md  ${
                  selectedUser.status == "Pending"
                    ? "text-custom-yellow border-custom-yellow"
                    : "" + selectedUser.status == "Resolved"
                    ? "text-custom-green border-custom-green"
                    : "" + selectedUser.status == "Rejected"
                    ? "text-custom-red border-custom-red"
                    : ""
                }`}
              >
                {selectedUser.status}
              </h3>
            </div>
          </div>
          <FormProvider {...methods}>
            <div className="flex flex-col text-base gap-4 mt-4">
              <p className="text-base">{selectedUser.description}</p>
              <h3 className="text-sm">
                <strong>Due Date by:</strong>  {selectedUser.dueDate.slice(0, 10)}
              </h3>
              <h3 className="text-sm">
                <strong>Created At:</strong>{" "}
                {selectedUser.createdAt.slice(0, 10)}
              </h3>
              <div
                className={selectedUser.status === "Deleted" ? "" : "hidden"}
              >
                            
              </div>

              <form
                className={selectedUser.status === "Unpaid" ||selectedUser.status === "Paid" ? "" : "hidden"}
              >
               
                <div
                  className={
                    selectedUser.status === "Unpaid" ||  selectedUser.status === "Paid"
                      ? "flex flex-row mt-6 md:justify-center gap-3"
                      : "hidden"
                  }
                >
                  <button
                    onClick={rejectRequest}
                    className="red text-white rounded-lg h-10 w-32"
                    type="button"
                  >
                    Unpaid
                  </button>
                  <button
                    onClick={approveRequest}
                    className="green-dark text-white rounded-lg h-10 w-32"
                    type="button"
                  >
                    Paid
                  </button>
                </div>
              </form>
            </div>
          </FormProvider>
        </div>
      </Modal>

     {/* Edit payment */}
     <Modal
        show={editModal}
        close={() => {
          setEditModal(false);
        }}
      >
         <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(HandleEditForm)}
            className="flex flex-col gap-6 justify-center align-center"
          >
           
            {/* <input
              type="file"
              {...register("file")}
              onChange={(e) => console.log(e.target.files)}
            /> */}

            <div>
              <h2 className="text-lg font-bold mb-2">Payment Details</h2>

              <div className="grid grid-cols-2 gap-4">
                
                <FormInputField name={"title"} placeholder="Payment Title*"   defaultValue={selectedUser.title} />
               
                <FormInputField
                  name={"description"}
                  required
                  placeholder="Description*"
                  defaultValue={selectedUser.description}
                />
                 <FormInputField
                  required
                  placeholder="Due Date"
                  type="text"
                  id="dueDate"
                  defaultValue={selectedUser.dueDate.slice(0,10)}
                   
                  name={"dueDate"}
                  size="30"
                />
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4">
              <input
                onClick={() => setModal(false)}
                type="button"
                value="Cancel"
                className="red p-3 rounded-lg text-white cursor-pointer"
              />
              <input
                type="submit"
                value="Save"
                className="grey p-3 rounded-lg text-white cursor-pointer"
              />
            </div>
          </form>
        </FormProvider>
      </Modal>
  

      {/* Delete payment */}
      <Modal
        show={deleteModal}
        close={() => {
          setDeleteModal(false);
        }}
      >
        <h2 className="text-lg">
          Are you sure you want to delete<br />
          
          {selectedUser.title }
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <input
            onClick={() => setDeleteModal(false)}
            type="button"
            value="Cancel"
            className="grey p-3 rounded-lg text-white cursor-pointer"
          />
          <input
            type="button"
            onClick={() => HandleDeleteForm()}
            value={selectedUser.status === "Paid" ||selectedUser.status === "Unpaid" ? "Delete" : "Delete"}
            className="red p-3 rounded-lg text-white cursor-pointer"
          />
        </div>
      </Modal>
    </main>
  );
};

export default Payments;
