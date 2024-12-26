import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Components = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
  ];

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Design System Components</h1>
        <p className="text-muted-foreground">A collection of all UI components used in the application.</p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature Card</CardTitle>
              <CardDescription>With additional content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Extended content with multiple elements</p>
                <Progress value={60} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Elements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input placeholder="Default Input" />
            <Input placeholder="Disabled Input" disabled />
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <label htmlFor="airplane-mode">Toggle Switch</label>
            </div>
          </div>
        </div>
      </section>

      {/* Badges and Tags */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Avatar Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatars</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Separators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Separators</h2>
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center space-x-4">
            <div>Item 1</div>
            <Separator orientation="vertical" className="h-4" />
            <div>Item 2</div>
            <Separator orientation="vertical" className="h-4" />
            <div>Item 3</div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tables</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableCaption>A list of recent invoices</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          invoice.paymentStatus === "Paid" 
                            ? "default"
                            : invoice.paymentStatus === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {invoice.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Components;
