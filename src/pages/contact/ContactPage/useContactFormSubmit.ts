import {App} from "antd";
import type {FormInstance} from "antd";
import {useCallback, useState} from "react";
import {
  getContactFormErrorMessage,
  sendContactMessage,
  type ContactFormValues,
} from "@/services/emailjs";

type UseContactFormSubmitOptions = {
  form: FormInstance<ContactFormValues>;
};

export function useContactFormSubmit({form}: UseContactFormSubmitOptions) {
  const {notification} = App.useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = useCallback(
    async (values: ContactFormValues) => {
      setIsSubmitting(true);

      try {
        await sendContactMessage(values);

        notification.success({
          message: "Message sent",
          description: "Thanks for reaching out. I'll get back to you within 24 hours.",
          placement: "top",
          duration: 5,
        });

        form.resetFields();
      } catch (error) {
        notification.error({
          message: "Could not send message",
          description: getContactFormErrorMessage(error),
          placement: "top",
          duration: 6,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, notification],
  );

  return {onFinish, isSubmitting};
}
