import { Formik, Form, Field } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import ErrorMessage from "../utils/ErrorMessage";
import { customModalStyles } from "../utils/customModalStyles";

import { iSignInProps, SignInFormValue } from "@/types/SignInTypes";
import { useToast } from "../utils/ToastContext";
import { signInValidationSchema } from "../utils/validationSchema";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SignIn: FunctionComponent<iSignInProps> = (props) => {
  const { isOpenModal, setIsOpenModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const [initialValues, setInitialValues] = useState<SignInFormValue>({
    username: "",
    password: "",
  });
  const { showError, showSuccess } = useToast();

  const { username, password, updateAuthenticationStatus } = useLocalStorage();

  const handleSubmit = async (values: SignInFormValue) => {
    if (values.username !== username) {
      return showError("Envalid User Name");
    }
    if (values.password !== password) {
      return showError("Envalid Password");
    }
    updateAuthenticationStatus("true");
    setIsOpenModal(false);
    return showSuccess("Login Succeesfully");
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

        <h2 className="text-2xl text-[#1D4A72] rounded-full font-bold mb-4">
          Sign in{" "}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={true}
        >
          {({ errors, touched }) => (
            <Form className="space-y-14">
              <div className="space-y-5">
                <div>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className={`w-full  border-b-[0.67px] border-black px-4 py-3 rounded-t-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none  ${
                      errors.username && touched.username
                        ? "ring-red-500"
                        : "ring-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    error={errors.username}
                    touched={touched.username}
                  />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`w-full border-b-[0.67px] border-black px-4 py-3 rounded-t-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none   ${
                      errors.password && touched.password
                        ? "ring-red-500"
                        : "ring-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 border-none outline-none rounded-full font-medium transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isLoading ? "Please wait..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default SignIn;
