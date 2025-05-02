import { Button } from "../ui/button";
import FormControls from "./form-controls";
import PropTypes from "prop-types";
function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

CommonForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // Validates that handleSubmit is a function and required
  buttonText: PropTypes.func.isRequired,
  formControls: PropTypes.func.isRequired,
  formData: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.func.isRequired,
};

export default CommonForm;
