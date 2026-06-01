import salonOwner from "../../../../assets/images/Salon Owner.jpeg";
interface AuthHeaderProps {
  subtitle: string;
}

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div
        className="
        w-20
        h-20
        rounded-full
        mx-auto
        mb-4
        bg-linear-to-r
        from-primary
        to-secondary
        overflow-hidden
      "
      >
        <img
          src={salonOwner}
          alt="Salon Owner"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <h1 className="text-3xl text-text">Eroo Beauty Salon</h1>

      <p className="text-text-muted mt-2">{subtitle}</p>
    </div>
  );
}
