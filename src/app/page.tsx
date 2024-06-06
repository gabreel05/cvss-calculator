'use client';

import { values } from '@/data/values';
import { VulnerabilityCard } from '@/components/vulnerability-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const [attackVector, setAttackVector] = useState<string>('N');
  const [attackComplexity, setAttackComplexity] = useState<string>('L');
  const [privilegesRequired, setPrivilegesRequired] = useState<string>('N');
  const [userInteraction, setUserInteraction] = useState<string>('N');
  const [scopeVector, setScopeVector] = useState<string>('U');
  const [confidentialityImpact, setConfidentialityImpact] =
    useState<string>('N');
  const [integrityImpact, setIntegrityImpact] = useState<string>('N');
  const [availabilityImpact, setAvailabilityImpact] = useState<string>('N');
  const [cvss, setCvss] = useState<string>(
    `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
  );
  const [severity, setSeverity] = useState<string>('');
  const [score, setScore] = useState<number>(0.0);
  const [historic, setHistoric] = useState<any[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      window.location.href = '/signin';
    }
  }, []);

  async function fetchData() {
    const response = await fetch(
      `http://localhost:8005/cvss?cvss_string=${cvss}`,
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
        method: 'GET',
      }
    );
    const data = await response.json();
    setSeverity(data.severity[0]);
    setScore(data.score);
  }

  async function fetchHistory() {
    const historic = await fetch('http://localhost:8005/user_history', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      method: 'GET',
    });
    const historicData = await historic.json();
    setHistoric(historicData);
  }

  async function saveToHistory() {
    await fetch('http://localhost:8005/cvss_history', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        cvss_string: cvss,
        cvss_score: {
          severity: severity,
          score: score,
        },
      }),
    });
    fetchHistory();
  }

  useEffect(() => {
    fetchData();
    fetchHistory();
  }, [
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scopeVector,
    confidentialityImpact,
    integrityImpact,
    availabilityImpact,
  ]);

  function handleSignOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    window.location.href = '/signin';
  }

  function handleAttackVectorChange(value: string) {
    setAttackVector(value);
    setCvss(
      `CVSS:3.1/AV:${value}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handleAttackComplexityChange(value: string) {
    setAttackComplexity(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${value}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handlePrivilegesRequiredChange(value: string) {
    setPrivilegesRequired(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${value}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handleUserInteractionChange(value: string) {
    setUserInteraction(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${value}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handleScopeVectorChange(value: string) {
    setScopeVector(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${value}/C:${confidentialityImpact}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handleConfidentialityImpactChange(value: string) {
    setConfidentialityImpact(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${value}/I:${integrityImpact}/A:${availabilityImpact}`
    );
  }

  function handleIntegrityImpactChange(value: string) {
    setIntegrityImpact(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${value}/A:${availabilityImpact}`
    );
  }

  function handleAvailabilityImpactChange(value: string) {
    setAvailabilityImpact(value);
    setCvss(
      `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scopeVector}/C:${confidentialityImpact}/I:${integrityImpact}/A:${value}`
    );
  }

  return (
    <div className="flex min-h-screen w-auto flex-col items-center justify-center p-24 bg-slate-200">
      <div className="flex flex-row justify-between w-1/2">
        <ScrollArea>
          <Sheet modal={true}>
            <SheetTrigger asChild>
              <Button>History</Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] sm:w-[600px] sm:max-w-[580px]">
              <SheetHeader>
                <SheetTitle>History</SheetTitle>
                <SheetDescription>
                  This is the history of the CVSS 3.1 Vulnerability Metrics
                  Calculator
                </SheetDescription>
              </SheetHeader>

              <div className="mt-10">
                <ScrollArea>
                  <Table>
                    <TableCaption>A list of your searches.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-start">Severity</TableHead>
                        <TableHead className="text-start">Score</TableHead>
                        <TableHead className="text-start">
                          CVSS String
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historic.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.cvss_score.severity[0]}</TableCell>
                          <TableCell>{item.cvss_score.score}</TableCell>
                          <TableCell className="font-medium">
                            {/* <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline">
                                    See CVSS String
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.cvss_string}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider> */}
                            {item.cvss_string}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </ScrollArea>
        <Button onClick={handleSignOut}>Exit</Button>
      </div>
      <div className="flex flex-col justify-center items-start w-max">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 mt-5 text-gray-900">
          CVSS 3.1 Vulnerability Metrics Calculator
        </h1>
      </div>
      <main className="grid grid-cols-4 gap-4">
        <VulnerabilityCard
          name={values.types[0].title}
          values={values.types[0].values}
          handleChange={handleAttackVectorChange}
        />

        <VulnerabilityCard
          name={values.types[1].title}
          values={values.types[1].values}
          handleChange={handleAttackComplexityChange}
        />

        <VulnerabilityCard
          name={values.types[2].title}
          values={values.types[2].values}
          handleChange={handlePrivilegesRequiredChange}
        />

        <VulnerabilityCard
          name={values.types[3].title}
          values={values.types[3].values}
          handleChange={handleUserInteractionChange}
        />

        <VulnerabilityCard
          name={values.types[4].title}
          values={values.types[4].values}
          handleChange={handleScopeVectorChange}
        />

        <VulnerabilityCard
          name={values.types[5].title}
          values={values.types[5].values}
          handleChange={handleConfidentialityImpactChange}
        />

        <VulnerabilityCard
          name={values.types[6].title}
          values={values.types[6].values}
          handleChange={handleIntegrityImpactChange}
        />

        <VulnerabilityCard
          name={values.types[7].title}
          values={values.types[7].values}
          handleChange={handleAvailabilityImpactChange}
        />
      </main>

      <Card className="mt-5 w-1/2 flex flex-col">
        <CardHeader className="flex flex-column align-middle justify-center bg-gray-900 h-0.5 text-center rounded">
          <CardTitle className="text-slate-300">
            Severity Score Vector
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-max  flex-1 pt-6">
            <div className="flex flex-row w-9/12 justify-between align-middle items-center mb-3">
              <Button onClick={saveToHistory}>Save to History</Button>
              <p className={cn('text-xl text-gray-800 bold font-bold')}>
                Score: {score}
              </p>

              <div
                className={cn(
                  'flex flex-row items-center justify-center rounded-lg p-2',
                  severity === 'Critical' && 'bg-red-200',
                  severity === 'High' && 'bg-orange-200',
                  severity === 'Medium' && 'bg-yellow-200',
                  severity === 'Low' && 'bg-green-200',
                  severity === 'None' && 'bg-blue-200'
                )}
              >
                <span>
                  Severity:{' '}
                  <span
                    className={cn(
                      'text-xl text-gray-800 bold font-bold',
                      severity === 'Critical' && 'text-red-500',
                      severity === 'High' && 'text-orange-500',
                      severity === 'Medium' && 'text-yellow-500',
                      severity === 'Low' && 'text-green-500',
                      severity === 'None' && 'text-blue-500'
                    )}
                  >
                    {severity}
                  </span>
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-800 bold font-bold">{cvss}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
