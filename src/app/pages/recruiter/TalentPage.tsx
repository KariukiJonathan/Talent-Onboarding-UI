import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Edit, Trash2, UserCircle2 } from 'lucide-react';
import { mockCompanies, mockRoles, mockTalent } from '../../mockData';
import { Talent } from '../../types';
import { toast } from 'sonner';
import { Progress } from '../../components/ui/progress';

export default function TalentPage() {
  const [talents, setTalents] = useState<Talent[]>(mockTalent);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTalent, setEditingTalent] = useState<Talent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyId: '',
    roleId: '',
    startDate: '',
    status: 'Pending' as Talent['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTalent) {
      setTalents(talents.map(t => 
        t.id === editingTalent.id 
          ? { ...t, ...formData }
          : t
      ));
      toast.success('Talent updated successfully!');
    } else {
      const newTalent: Talent = {
        id: String(talents.length + 1),
        ...formData,
        progress: 0,
      };
      setTalents([...talents, newTalent]);
      toast.success('Talent added successfully!');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (talent: Talent) => {
    setEditingTalent(talent);
    setFormData({
      name: talent.name,
      email: talent.email,
      companyId: talent.companyId,
      roleId: talent.roleId,
      startDate: talent.startDate,
      status: talent.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTalents(talents.filter(t => t.id !== id));
    toast.success('Talent deleted successfully!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      companyId: '',
      roleId: '',
      startDate: '',
      status: 'Pending',
    });
    setEditingTalent(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const availableRoles = formData.companyId 
    ? mockRoles.filter(r => r.companyId === formData.companyId)
    : [];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Talent</h1>
          <p className="text-gray-600 mt-1">Manage and onboard talent</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4" />
              Add Talent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTalent ? 'Edit Talent' : 'Add New Talent'}</DialogTitle>
              <DialogDescription>
                {editingTalent ? 'Update talent information' : 'Onboard a new talent member'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyId">Company *</Label>
                  <Select
                    value={formData.companyId}
                    onValueChange={(value) => setFormData({ ...formData, companyId: value, roleId: '' })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCompanies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleId">Role *</Label>
                  <Select
                    value={formData.roleId}
                    onValueChange={(value) => setFormData({ ...formData, roleId: value })}
                    required
                    disabled={!formData.companyId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Talent['status'] })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  {editingTalent ? 'Update' : 'Add'} Talent
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Talent</CardTitle>
          <CardDescription>A list of all onboarded talent members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talent</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {talents.map((talent) => {
                const company = mockCompanies.find(c => c.id === talent.companyId);
                const role = mockRoles.find(r => r.id === talent.roleId);
                return (
                  <TableRow key={talent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {talent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{talent.name}</p>
                          <p className="text-sm text-gray-500">{talent.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{role?.title}</TableCell>
                    <TableCell>{talent.startDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={talent.progress} className="w-20" />
                        <span className="text-sm">{talent.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        talent.status === 'Active' ? 'bg-green-100 text-green-700' :
                        talent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {talent.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(talent)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(talent.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
