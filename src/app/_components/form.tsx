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
    <div className="w-full p-6 md:p-8 overflow-y-auto bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rotate-[-0.5deg] transform-gpu">
      <h1 className="font-bold text-2xl text-[#111111] mb-6 flex items-center rotate-[-1deg] transform-gpu">
        <span className="w-4 h-8 bg-[#FF3A5E] mr-3 rotate-[2deg] transform-gpu border-[2px] border-[#111111]"></span>
        {title}
      </h1>
      <form onSubmit={onSubmit} className="space-y-5">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2 text-sm font-bold text-[#111111] rotate-[-0.5deg] transform-gpu">
              {field.label}{" "}
              {field.required && <span className="text-[#FF3A5E]">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className="w-full p-3 border-[3px] border-[#111111] rounded-none bg-white text-[#111111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] transition-all resize-none shadow-[3px_3px_0px_#111111]"
                rows={4}
              />
            ) : field.type === "select" ? (
              <div className="relative">
                <select
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  className="w-full p-3 border-[3px] border-[#111111] rounded-none bg-white text-[#111111] appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFFF00] transition-all shadow-[3px_3px_0px_#111111]"
                >
                  <option value="" disabled>
                    Pilih {field.label}
                  </option>
                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-white text-[#111111]"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#111111]">
                  <svg
                    className="w-4 h-4 rotate-[3deg] transform-gpu"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
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
                      <div className="relative border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rotate-[0.5deg] transform-gpu">
                        <Image
                          src={field.preview}
                          alt="preview"
                          width={350}
                          height={300}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex flex-col items-center rotate-[-2deg] transform-gpu">
                            <FileUploadIcon />
                            <span className="text-white font-bold">
                              Ganti Gambar
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[300px] border-[3px] border-dashed border-[#111111] flex items-center justify-center bg-white group-hover:bg-[#FFE962] transition-colors shadow-[4px_4px_0px_#111111] rotate-[0.5deg] transform-gpu">
                        <div className="text-center p-6 rotate-[-1deg] transform-gpu">
                          <div className="mb-3">
                            <svg
                              className="mx-auto h-12 w-12 text-[#111111] group-hover:text-[#111111] transition-colors"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-[#111111] font-bold group-hover:text-[#111111] transition-colors">
                            Klik untuk upload
                          </p>
                          <p className="text-sm text-[#111111] mt-2 font-medium">
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
                className="w-full p-3 border-[3px] border-[#111111] rounded-none bg-white text-[#111111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] transition-all shadow-[3px_3px_0px_#111111]"
              />
            )}
            {field.required && (
              <p className="text-[#FF3A5E] text-xs mt-2 font-bold invisible peer-invalid:visible rotate-[-1deg] transform-gpu">
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
              className="bg-[#FFFF00] text-[#111111] font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-none py-2.5 px-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rotate-[1deg] transform-gpu"
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
