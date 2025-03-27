import React from "react";
import Image from "next/image";
import { CircleLoading } from "../../../public/image";
import { ArrowRightIcon, FileUploadIcon } from "../admin/_components/svg";

export const Form = ({
  title,
  fields,
  onSubmit,
  buttonText = "Submit",
  loading = false,
  transactionButton,
}: FormProps) => {
  return (
    <div className="w-full p-6 md:p-8 overflow-y-auto">
      <h1 className="font-bold text-2xl text-white mb-6 flex items-center">
        <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
        {title}
      </h1>
      <form onSubmit={onSubmit} className="space-y-5">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {field.label}{" "}
              {field.required && <span className="text-[#FFFF00]">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className="w-full p-3 border border-gray-700 rounded-lg bg-[#222222] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all resize-none"
                rows={4}
              />
            ) : field.type === "select" ? (
              <div className="relative">
                <select
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-[#222222] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all"
                >
                  <option value="" disabled>
                    Pilih {field.label}
                  </option>
                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-[#222222]"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
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
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <div className="flex flex-col items-center">
                            <FileUploadIcon />
                            <span className="text-white font-medium">
                              Ganti Gambar
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[300px] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-[#1A1A1A] group-hover:bg-[#222222] transition-colors">
                        <div className="text-center p-6">
                          <div className="mb-3">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-500 group-hover:text-[#FFFF00] transition-colors"
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
                          <p className="text-gray-400 font-medium group-hover:text-white transition-colors">
                            Klik untuk upload
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
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
                className="w-full p-3 border border-gray-700 rounded-lg bg-[#222222] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all"
              />
            )}
            {field.required && (
              <p className="text-red-400 text-xs mt-2 invisible peer-invalid:visible">
                {field.label} wajib diisi
              </p>
            )}
          </div>
        ))}
        <div className="flex justify-end pt-4">
          {!transactionButton ? (
            <button
              type="submit"
              disabled={
                loading ||
                fields.some((field) => field.required && !field.value)
              }
              className="bg-[#FFFF00] hover:bg-[#E6E600] text-black font-medium rounded-lg py-2.5 px-5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                <>
                  {buttonText}
                  <ArrowRightIcon />
                </>
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
