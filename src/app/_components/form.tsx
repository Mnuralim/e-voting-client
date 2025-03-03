import React from "react";
import Image from "next/image";
import { CircleLoading } from "../../../public/image";

export const Form = ({
  title,
  fields,
  onSubmit,
  buttonText = "Submit",
  loading = false,
  transactionButton,
}: FormProps) => {
  return (
    <div className="w-full p-16 overflow-y-auto h-full">
      <h1 className="font-bold text-xl mb-8">{title}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className="w-full p-2 border rounded peer bg-white text-black"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className="w-full p-2 border bg-white rounded peer text-black"
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <div className="flex flex-col max-w-xs">
                <div className="relative group">
                  <input
                    type="file"
                    name={field.name}
                    onChange={field.onChange}
                    className="hidden"
                    id={field.name}
                    accept={field.accept}
                    required={field.required}
                  />
                  <label htmlFor={field.name} className="cursor-pointer block">
                    {field.preview ? (
                      <div className="relative">
                        <Image
                          src={field.preview}
                          alt="preview"
                          width={350}
                          height={300}
                          className="rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">
                            Upload here
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[400px] border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                        <div className="text-center">
                          <div className="mb-2">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-600">Click to upload</p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, JPEG
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className="w-full p-2 border rounded peer bg-white text-black"
              />
            )}
            {field.required && (
              <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
                {field.label} is required
              </p>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-10">
          {!transactionButton ? (
            <button
              type="submit"
              disabled={loading}
              className="border-white bg-white font-semibold text-black rounded-lg py-2 px-4 flex items-center justify-center"
            >
              {loading ? (
                <Image
                  alt="circle-loading"
                  src={CircleLoading}
                  width={20}
                  height={20}
                  className="animate-spin"
                />
              ) : (
                buttonText
              )}
            </button>
          ) : (
            transactionButton
          )}
        </div>
      </form>
    </div>
  );
};
