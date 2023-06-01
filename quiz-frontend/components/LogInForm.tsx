'use client';

import { Label, TextInput, Button, Checkbox } from "flowbite-react";

export default function LogIn() {

return(
<form className="flex max-w-md flex-col gap-4 border-2 rounded-lg p-4 m-12 w-full bg-gray-light">
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      placeholder="name@flowbite.com"
      required
      type="email"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      required
      type="password"
    />
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="remember" />
    <Label htmlFor="remember">
      Remember me
    </Label>
  </div>
  <Button type="submit">
    Submit
  </Button>
</form>
)
}
