import { Formik, Form, Field } from "formik";
import { FunctionComponent } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { useTriggerGraphUpdate } from "../query/useTriggerGraphUpdate";
import ErrorMessage from "../utils/ErrorMessage";
import { useToast } from "../utils/ToastContext";
import { customModalStyles } from "../utils/customModalStyles";
import { validationSchema } from "../utils/validationSchema";
import {
  FormValues,
  iNodeRelationshipManagerProps,
} from "../types/NodeRelationshipManagertypes";
import { useLocalStorage } from "../hooks/useLocalStorage";

const NodeRelationshipManager: React.FC<iNodeRelationshipManagerProps> = (
  props
) => {
  const { isOpenModal, setIsOpenModal, refetch } = props;
  const { showSuccess, showError } = useToast();
  const { isAuthenticated } = useLocalStorage();
  const { mutate, isLoading } = useTriggerGraphUpdate();

  const initialValues: FormValues = {
    url: "",
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = async (values: FormValues) => {
    mutate(
      {
        url: values.url,
      },
      {
        onSuccess: () => {
          refetch();
          showSuccess("New Graph Data initialized");
          handleCloseModal();
        },
        onError: (error: any) => {
          showError(error.message);
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpenModal}
      style={customModalStyles}
      className="flex items-center justify-center min-h-screen"
      ariaHideApp={false}
    >
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Icon */}
        <button
          className="absolute hover:scale-125 top-4 right-4 text-gray-400 hover:text-black focus:outline-none"
          onClick={handleCloseModal}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl text-black font-bold mb-4">
          RyzosphereGraph App
        </h2>
        <p className="text-[16px] font-medium text-black mb-6">
          Add or Update Knowledge Graph
        </p>

        {isAuthenticated === "true" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
          >
            {({ errors, touched }) => (
              <Form className="space-y-14">
                <div className="space-y-5">
                  <div>
                    <Field
                      name="url"
                      type="text"
                      placeholder="Enter a spreadsheet URL..."
                      className={`w-full border-b-[0.67px] border-black px-4 py-3 rounded-t-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none ${
                        errors.url && touched.url
                          ? "ring-red-500"
                          : "ring-gray-300"
                      }`}
                    />
                    <ErrorMessage error={errors.url} touched={touched.url} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-full font-medium transition-colors ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {isLoading ? "Submitting..." : "Update Graph"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="text-center text-red-500 font-medium">
            You need to sign in first to perform this action.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NodeRelationshipManager;
