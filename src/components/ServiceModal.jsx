import {
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  Plane,
  Stethoscope,
  X,
  ArrowLeft,
  Sprout,
  Files,
} from "lucide-react";

import { getMailUrl, getWhatsAppUrl } from "../config";
import { fallbackServiceIcon, serviceIcons } from "../data/ui";

export default function ServiceModal({
  lang,
  service,
  visaType,
  setVisaType,
  landServiceType,
  setLandServiceType,
  onClose,
}) {
  if (!service) return null;

  const isBn = lang === "bn";

  const Icon = serviceIcons[service.id] || fallbackServiceIcon;

  // All service options
  const serviceOptions = {
    "indian-visa": [
      {
        id: "tourist",
        titleBn: "ট্যুরিস্ট ভিসা",
        titleEn: "Tourist Visa",
        descBn: "ভ্রমণ, দর্শনীয় স্থান ও আত্মীয়-স্বজনের সাথে দেখা",
        descEn: "Travel, sightseeing and visiting friends or family",
        Icon: Plane,
      },
      {
        id: "medical",
        titleBn: "মেডিকেল ভিসা",
        titleEn: "Medical Visa",
        descBn: "ভারতে চিকিৎসা নেওয়ার জন্য",
        descEn: "For medical treatment in India",
        Icon: Stethoscope,
      },
    ],

    "land-tax": [
      {
        id: "tax",
        titleBn: "ভূমি উন্নয়ন কর / খাজনা",
        titleEn: "Land Development Tax",
        descBn: "জমির খাজনা ও ভূমি উন্নয়ন কর পরিশোধের সহায়তা",
        descEn: "Land development tax payment assistance",
        Icon: Sprout,
      },
      {
        id: "namjari",
        titleBn: "নামজারি / মিউটেশন",
        titleEn: "Mutation / Namjari",
        descBn: "জমির মালিকানা পরিবর্তন ও নামজারি আবেদন",
        descEn: "Land mutation and ownership record updates",
        Icon: FileText,
      },
      {
        id: "khatian",
        titleBn: "খতিয়ান / পর্চা",
        titleEn: "Khatian / Land Record",
        descBn: "জমির খতিয়ান, পর্চা ও ভূমি রেকর্ড সংগ্রহ",
        descEn: "Khatian and land record assistance",
        Icon: Files,
      },
    ],
  };

  // Selected option state
  const selectedType =
    service.id === "indian-visa"
      ? visaType
      : service.id === "land-tax"
        ? landServiceType
        : null;

  const setSelectedType =
    service.id === "indian-visa"
      ? setVisaType
      : service.id === "land-tax"
        ? setLandServiceType
        : null;

  const options = serviceOptions[service.id] || [];

  const selectedOption = options.find(
    (option) => option.id === selectedType
  );

  const showOptions = options.length > 0 && !selectedType;

  // Get requirements
  const getRequirements = () => {
    if (service.id === "indian-visa") {
      if (visaType === "tourist") {
        return isBn
          ? service.touristRequirementsBn || []
          : service.touristRequirementsEn || [];
      }

      if (visaType === "medical") {
        return isBn
          ? service.medicalRequirementsBn || []
          : service.medicalRequirementsEn || [];
      }

      return [];
    }

    if (service.id === "land-tax") {
      const requirementsMap = {
        tax: {
          bn: service.landtaxRequirementsBn,
          en: service.landtaxRequirementsEn,
        },
        namjari: {
          bn: service.landNamjariRequirementsBn,
          en: service.landNamjariRequirementsEn,
        },
        khatian: {
          bn: service.landkhatianRequirementsBn,
          en: service.landkhatianRequirementsEn,
        },
      };

      return requirementsMap[selectedType]?.[lang] || [];
    }

    return isBn
      ? service.requirementsBn || []
      : service.requirementsEn || [];
  };

  const requirements = getRequirements();

  // Close modal and reset selections
  const handleClose = () => {
    setVisaType?.(null);
    setLandServiceType?.(null);
    onClose?.();
  };

  // Back to options
  const handleBack = () => {
    setSelectedType?.(null);
  };

  // Contact service name
  const serviceName = isBn ? service.bn : service.en;

  const contactServiceName = selectedOption
    ? `${serviceName} - ${
        isBn ? selectedOption.titleBn : selectedOption.titleEn
      }`
    : serviceName;

  return (
    <div
      className="modal modal-open service-modal-overlay bg-black/50 p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div className="modal-box service-modal-box w-full max-w-2xl rounded-2xl p-0 sm:rounded-3xl">

        {/* Header */}
        <div className="border-b px-4 py-4 sm:px-8 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="service-icon flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
                <Icon size={27} strokeWidth={1.9} />
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#159f9b]">
                  {service.category}
                </div>

                <h3
                  id="service-modal-title"
                  className="mt-1 text-xl font-black text-[#07334a] sm:text-2xl"
                >
                  {serviceName}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="btn btn-circle btn-ghost btn-sm shrink-0"
              aria-label={isBn ? "বন্ধ করুন" : "Close"}
            >
              <X size={21} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-5 sm:px-8 sm:py-6">

          {/* Description */}
          <p className="leading-7 text-slate-600">
            {isBn ? service.descBn : service.descEn}
          </p>

          {/* Service options */}
          {showOptions ? (
            <div className="mt-7">
              <h4 className="text-lg font-bold text-[#07334a]">
                {isBn
                  ? service.id === "indian-visa"
                    ? "ভিসার ধরন নির্বাচন করুন"
                    : "ভূমি সেবার ধরন নির্বাচন করুন"
                  : service.id === "indian-visa"
                    ? "Choose Visa Type"
                    : "Choose Land Service"}
              </h4>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {options.map((option) => {
                  const OptionIcon = option.Icon;

                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setSelectedType?.(option.id)}
                      className="visa-option text-left"
                    >
                      <div className="visa-option-icon">
                        <OptionIcon size={25} />
                      </div>

                      <div className="visa-option-title mt-4 text-lg font-bold">
                        {isBn ? option.titleBn : option.titleEn}
                      </div>

                      <p className="visa-option-desc mt-1 text-sm">
                        {isBn ? option.descBn : option.descEn}
                      </p>

                      <div className="visa-option-link mt-4 text-xs font-bold">
                        {isBn
                          ? "প্রয়োজনীয় কাগজপত্র দেখুন →"
                          : "View requirements →"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Back button */}
              {selectedOption && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-4 mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#159f9b] hover:text-[#07334a]"
                >
                  <ArrowLeft size={17} />

                  {isBn
                    ? service.id === "indian-visa"
                      ? "ভিসার ধরনে ফিরে যান"
                      : "ভূমি সেবায় ফিরে যান"
                    : service.id === "indian-visa"
                      ? "Back to visa types"
                      : "Back to land services"}
                </button>
              )}

              {/* Selected option */}
              {selectedOption && (
                <div className="mt-5 rounded-xl border border-[#159f9b]/20 bg-[#eefbf8] p-4">
                  <div className="flex items-center gap-3">
                    <selectedOption.Icon
                      size={24}
                      className="shrink-0 text-[#159f9b]"
                    />

                    <h4 className="text-base font-bold text-[#07334a] sm:text-lg">
                      {isBn
                        ? selectedOption.titleBn
                        : selectedOption.titleEn}
                    </h4>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {isBn
                      ? selectedOption.descBn
                      : selectedOption.descEn}
                  </p>
                </div>
              )}

              {/* Requirements */}
              <div className="mt-7">
                <h4 className="text-lg font-bold text-[#07334a]">
                  {isBn
                    ? "যা যা লাগতে পারে"
                    : "Required Information & Documents"}
                </h4>

                {requirements.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {requirements.map((item, index) => (
                      <div
                        key={`${index}-${item}`}
                        className="flex gap-3 rounded-xl bg-base-200 p-3 text-sm leading-6 text-slate-600"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-1 shrink-0 text-success"
                        />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl bg-base-200 p-4 text-sm leading-6 text-slate-600">
                    {isBn
                      ? "এই সেবার প্রয়োজনীয় কাগজপত্র সম্পর্কে বিস্তারিত জানতে WhatsApp বা Email-এ যোগাযোগ করুন।"
                      : "Contact us through WhatsApp or Email for information about the documents required for this service."}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Note */}
          <div className="mt-7 rounded-2xl bg-[#eefbf8] p-4 text-sm leading-6 text-[#176c65]">
            {isBn
              ? "নোট: সেবার ধরন ও ব্যক্তিগত পরিস্থিতি অনুযায়ী অতিরিক্ত কাগজপত্র প্রয়োজন হতে পারে। আবেদন করার আগে যোগাযোগ করে নিশ্চিত হয়ে নিন।"
              : "Note: Additional documents may be required depending on the service and individual circumstances. Please contact us to confirm before applying."}
          </div>

          {/* Contact buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppUrl(contactServiceName)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 rounded-xl text-white"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <a
              href={getMailUrl(contactServiceName)}
              className="btn flex-1 rounded-xl border-slate-200 bg-white"
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={handleClose}
      >
        <button type="button" aria-label="Close modal">
          close
        </button>
      </div>
    </div>
  );
}