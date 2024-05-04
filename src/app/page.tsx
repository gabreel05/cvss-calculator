import { values } from "@/data/values";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen w-auto flex-col items-center justify-center p-24 bg-slate-200">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-gray-900">
        CVSS 3.1 Vulnerability Metrics Calculator
      </h1>
      <main className="grid grid-cols-4 gap-4">
        {values.types.map((type) => (
          <VulnerabilityCard
            key={type.title}
            name={type.title}
            values={type.values}
          />
        ))}
        {/* </div> */}
      </main>
      <Card className="mt-10 w-1/2">
        <CardHeader className="flex flex-column align-middle justify-center bg-gray-900 h-0.5 text-center rounded">
          <CardTitle className="text-slate-300">
            Severity Score Vector
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center align-middle justify-center h-auto flex-1 text-center">
          <p className="text-md text-muted-foreground">
            CVSS:3.1/AV:_/AC:_/PR:_/UI:_/S:_/C:_/I:_/A:_
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
