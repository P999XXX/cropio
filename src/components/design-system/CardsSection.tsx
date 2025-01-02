import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const CardsSection = () => {
  return (
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
  );
};