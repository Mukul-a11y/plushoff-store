import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Address {
  id: string
  first_name: string
  last_name: string
  address_1: string
  address_2?: string
  city: string
  state: string
  postal_code: string
  country_code: string
  phone?: string
  is_default: boolean
}

export default function AddressManager() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postal_code: "",
    country_code: "",
    phone: "",
    is_default: false
  })

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/addresses")
      if (!response.ok) throw new Error("Failed to fetch addresses")
      const data = await response.json()
      setAddresses(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isEditing = editing !== null

    try {
      setCreating(true)
      const response = await fetch("/api/addresses", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing
            ? { address_id: editing, ...formData }
            : formData
        )
      })

      if (!response.ok) throw new Error("Failed to save address")

      toast({
        title: "Success",
        description: `Address ${isEditing ? "updated" : "created"} successfully`
      })

      // Reset form and refresh addresses
      setFormData({
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postal_code: "",
        country_code: "",
        phone: "",
        is_default: false
      })
      setEditing(null)
      fetchAddresses()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} address`,
        variant: "destructive"
      })
    } finally {
      setCreating(false)
    }
  }

  const handleEdit = (address: Address) => {
    setEditing(address.id)
    setFormData({
      first_name: address.first_name,
      last_name: address.last_name,
      address_1: address.address_1,
      address_2: address.address_2 || "",
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country_code: address.country_code,
      phone: address.phone || "",
      is_default: address.is_default
    })
  }

  const handleDelete = async (addressId: string) => {
    try {
      const response = await fetch(`/api/addresses?addressId=${addressId}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete address")

      toast({
        title: "Success",
        description: "Address deleted successfully"
      })

      fetchAddresses()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {editing ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name
              </label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name
              </label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="address_1" className="block text-sm font-medium">
              Address Line 1
            </label>
            <Input
              id="address_1"
              value={formData.address_1}
              onChange={(e) =>
                setFormData({ ...formData, address_1: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="address_2" className="block text-sm font-medium">
              Address Line 2
            </label>
            <Input
              id="address_2"
              value={formData.address_2}
              onChange={(e) =>
                setFormData({ ...formData, address_2: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium">
                Postal Code
              </label>
              <Input
                id="postal_code"
                value={formData.postal_code}
                onChange={(e) =>
                  setFormData({ ...formData, postal_code: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="country_code" className="block text-sm font-medium">
                Country Code
              </label>
              <Input
                id="country_code"
                value={formData.country_code}
                onChange={(e) =>
                  setFormData({ ...formData, country_code: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_default"
              checked={formData.is_default}
              onChange={(e) =>
                setFormData({ ...formData, is_default: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="is_default" className="text-sm font-medium">
              Set as default address
            </label>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editing ? "Updating..." : "Creating..."}
                </>
              ) : (
                editing ? "Update Address" : "Add Address"
              )}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(null)
                  setFormData({
                    first_name: "",
                    last_name: "",
                    address_1: "",
                    address_2: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    country_code: "",
                    phone: "",
                    is_default: false
                  })
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Your Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven't added any addresses yet
          </p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={cn(
                  "border rounded-lg p-4 space-y-2",
                  address.is_default && "border-primary"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {address.first_name} {address.last_name}
                      {address.is_default && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.address_1}
                      {address.address_2 && <>, {address.address_2}</>}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.postal_code}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.country_code}
                    </p>
                    {address.phone && (
                      <p className="text-sm text-muted-foreground">
                        {address.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(address)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 