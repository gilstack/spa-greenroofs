import React from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const MarkerCreate: React.FC = () => {
  const { form } = useForm();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (!values) return;

      const token = localStorage.getItem("token");

      if (!token) {
        handleSessionExpiration();
        return;
      }

      await createMarker(values, token);

      message.success("Novo ponto de cobertura verde criado com sucesso!");

      router.push("/marker");
    } catch (error) {
      handleRequestError(error as AxiosError);
    }
  };

  const handleSessionExpiration = () => {
    message.error("Sua sessão expirou. Redirecionando para a página de login.");
    router.push("/login");
  };

  const createMarker = async (values: any, token: string) => {
    try {
      await axios.post(`${apiUrl}/marker/create`, values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const handleRequestError = (error: AxiosError) => {
    console.error("Erro ao criar o ponto de cobertura verde:", error);

    if (error.response) {
      let errorMessage: string;

      try {
        errorMessage = String(error.response.data);
      } catch (conversionError) {
        errorMessage =
          "Erro de servidor. Por favor, tente novamente mais tarde.";
      }

      message.error(errorMessage);
    } else if (error.request) {
      message.error(
        "Sem resposta do servidor. Por favor, tente novamente mais tarde."
      );
    } else {
      message.error(
        "Erro ao processar a requisição. Por favor, tente novamente."
      );
    }
  };

  return (
    <Create
      resource="marker"
      saveButtonProps={{
        onClick: handleSave,
      }}
    >
      <Form form={form} layout="vertical">
        {[
          { label: "Title", name: ["title"] },
          { label: "Descrição", name: ["description"] },
          { label: "Contato", name: ["contact"] },
          { label: "Categoria", name: ["category"] },
          { label: "Latitude", name: ["latitude"], type: "number" },
          { label: "Longitude", name: ["longitude"], type: "number" },
        ].map((field) => (
          <Form.Item
            key={field.name[0]}
            label={field.label}
            name={field.name}
            rules={[
              {
                required: true,
                message: `Por favor, preencha o campo ${field.label.toLowerCase()}.`,
              },
            ]}
          >
            {field.type === "number" ? <Input type="number" /> : <Input />}
          </Form.Item>
        ))}
      </Form>
    </Create>
  );
};

export default MarkerCreate;
