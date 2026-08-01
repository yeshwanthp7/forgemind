import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Wrench, Sparkles, AlertTriangle } from 'lucide-react';

export const CreateTicketModal = ({ isOpen, onClose, onSubmitTicket }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: "Urgent Hydraulic Press Shaft Bearing Replacement",
      priority: "P1 Critical",
      assetId: "HP-9042",
      zone: "Zone B",
      assignedTechnician: "Alex Rivera (Mechanical Tier 2)",
      estimatedTime: "2.5 Hours",
      notes: "AI Sentinel detected 184°C thermal runaway on drive shaft bearing. Lubrication breakdown confirmed."
    }
  });

  const onFormSubmit = (data) => {
    onSubmitTicket({
      ...data,
      id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Open",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      technicianAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      requiredParts: ["SKF-6210 Bearing", "Mobil SHC Lubricant"]
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dispatch Maintenance Work Order">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <p className="text-slate-300">
            Form auto-populated with <strong className="text-cyan-300">ForgeMind AI Diagnostics</strong>. Verify technician availability and required spare parts before dispatch.
          </p>
        </div>

        <Input
          label="Work Order Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Priority Level"
            {...register("priority")}
            options={[
              { label: "P1 Critical (Immediate Hazard)", value: "P1 Critical" },
              { label: "P2 High (Scheduled Downtime)", value: "P2 High" },
              { label: "P3 Medium (Normal Wear)", value: "P3 Medium" },
              { label: "P4 Low (Preventive Check)", value: "P4 Low" }
            ]}
          />

          <Select
            label="Target Factory Zone"
            {...register("zone")}
            options={[
              { label: "Zone B - Hydraulics Bay", value: "Zone B" },
              { label: "Zone A - Stamping Bay", value: "Zone A" },
              { label: "Zone C - Robotic Welding", value: "Zone C" },
              { label: "Zone D - Chemical Boiler", value: "Zone D" }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Affected Asset ID"
            {...register("assetId", { required: "Asset ID required" })}
            error={errors.assetId?.message}
          />

          <Input
            label="Assigned Technician / Specialist"
            {...register("assignedTechnician")}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Diagnostic & Remediation Notes
          </label>
          <textarea
            {...register("notes")}
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" icon={Wrench}>
            Dispatch Work Order
          </Button>
        </div>
      </form>
    </Modal>
  );
};
