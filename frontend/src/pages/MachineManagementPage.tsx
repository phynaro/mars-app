import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ToastStack from '@/components/ui/toast-stack';
import { useToast } from '@/hooks/useToast';
import administrationService, {
  type Machine,
  type Plant,
  type Area,
  type Line,
} from '@/services/administrationService';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';

type ViewMode = 'list' | 'create' | 'edit' | 'view';

const MachineManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [machines, setMachines] = useState<Machine[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlant, setFilterPlant] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterLine, setFilterLine] = useState<string>('all');
  const [filterActive, setFilterActive] = useState<string>('all');
  const { toast, toasts, removeToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    line_id: '',
    name: '',
    description: '',
    code: '',
    machine_number: '',
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [machinesData, lookupData] = await Promise.all([
        administrationService.machine.getAll(),
        administrationService.lookup.getLookupData(),
      ]);
      setMachines(machinesData);
      setPlants(lookupData.plants);
      setAreas(lookupData.areas);
      setLines(lookupData.lines);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedMachine(null);
    setFormData({
      line_id: '',
      name: '',
      description: '',
      code: '',
      machine_number: '',
      is_active: true,
    });
    setViewMode('create');
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormData({
      line_id: machine.line_id.toString(),
      name: machine.name,
      description: machine.description || '',
      code: machine.code,
      machine_number: machine.machine_number.toString(),
      is_active: machine.is_active,
    });
    setViewMode('edit');
  };

  const handleView = (machine: Machine) => {
    setSelectedMachine(machine);
    setViewMode('view');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.line_id || !formData.machine_number) {
      toast({
        title: 'Error',
        description: 'Please select a line and enter machine number',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        ...formData,
        line_id: parseInt(formData.line_id),
        machine_number: parseInt(formData.machine_number),
      };

      if (viewMode === 'create') {
        await administrationService.machine.create(submitData);
        toast({
          title: 'Success',
          description: 'Machine created successfully',
        });
      } else if (viewMode === 'edit' && selectedMachine) {
        await administrationService.machine.update(
          selectedMachine.id,
          submitData,
        );
        toast({
          title: 'Success',
          description: 'Machine updated successfully',
        });
      }

      await loadData();
      setViewMode('list');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save machine',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (machine: Machine) => {
    if (
      !confirm(`Are you sure you want to delete machine "${machine.name}"?`)
    ) {
      return;
    }

    // Use setTimeout to prevent blocking the UI thread
    setTimeout(async () => {
      try {
        setLoading(true);
        await administrationService.machine.delete(machine.id);
        toast({
          title: 'Success',
          description: 'Machine deleted successfully',
        });
        await loadData();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to delete machine',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlant =
      filterPlant === 'all' ||
      machine.plant_name ===
        plants.find((p) => p.id.toString() === filterPlant)?.name;
    const matchesArea =
      filterArea === 'all' ||
      machine.area_name ===
        areas.find((a) => a.id.toString() === filterArea)?.name;
    const matchesLine =
      filterLine === 'all' || machine.line_id.toString() === filterLine;
    const matchesActive =
      filterActive === 'all' ||
      (filterActive === 'active' && machine.is_active) ||
      (filterActive === 'inactive' && !machine.is_active);
    return (
      matchesSearch &&
      matchesPlant &&
      matchesArea &&
      matchesLine &&
      matchesActive
    );
  });

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <>
        <div className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>
                  {viewMode === 'create'
                    ? 'Create New Machine'
                    : 'Edit Machine'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="line_id">Line *</Label>
                    <Select
                      value={formData.line_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, line_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a line" />
                      </SelectTrigger>
                      <SelectContent>
                        {lines.map((line) => (
                          <SelectItem key={line.id} value={line.id.toString()}>
                            {line.plant_name} → {line.area_name} → {line.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="code">Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="machine_number">Machine Number *</Label>
                    <Input
                      id="machine_number"
                      type="number"
                      value={formData.machine_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          machine_number: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="is_active">Status</Label>
                    <Select
                      value={formData.is_active ? 'active' : 'inactive'}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          is_active: value === 'active',
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={loading}>
                      {loading
                        ? 'Saving...'
                        : viewMode === 'create'
                          ? 'Create'
                          : 'Update'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setViewMode('list')}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <ToastStack toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  if (viewMode === 'view' && selectedMachine) {
    const line = lines.find((l) => l.id === selectedMachine.line_id);
    const area = areas.find((a) => a.id === line?.area_id);
    const plant = plants.find((p) => p.id === line?.plant_id);

    return (
      <>
        <div className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Machine Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Name
                  </Label>
                  <p className="text-lg">{selectedMachine.name}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Code
                  </Label>
                  <p className="text-lg">{selectedMachine.code}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Machine Number
                  </Label>
                  <p className="text-lg">{selectedMachine.machine_number}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Plant
                  </Label>
                  <p className="text-lg">{plant?.name || 'Unknown'}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Area
                  </Label>
                  <p className="text-lg">{area?.name || 'Unknown'}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Line
                  </Label>
                  <p className="text-lg">{line?.name || 'Unknown'}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Description
                  </Label>
                  <p className="text-lg">
                    {selectedMachine.description || 'No description'}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <Badge
                    variant={
                      selectedMachine.is_active ? 'default' : 'secondary'
                    }
                  >
                    {selectedMachine.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Created
                  </Label>
                  <p className="text-lg">
                    {new Date(selectedMachine.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Last Updated
                  </Label>
                  <p className="text-lg">
                    {new Date(selectedMachine.updated_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleEdit(selectedMachine)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => setViewMode('list')}>
                    Back to List
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <ToastStack toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Machine Management</h1>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Machine
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search machines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterPlant} onValueChange={setFilterPlant}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Plants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plants</SelectItem>
                  {plants.map((plant) => (
                    <SelectItem key={plant.id} value={plant.id.toString()}>
                      {plant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterArea} onValueChange={setFilterArea}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id.toString()}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterLine} onValueChange={setFilterLine}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Lines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Lines</SelectItem>
                  {lines.map((line) => (
                    <SelectItem key={line.id} value={line.id.toString()}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterActive} onValueChange={setFilterActive}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="space-y-4 md:hidden">
                  {filteredMachines.map((machine) => {
                    const line = lines.find((l) => l.id === machine.line_id);
                    const area = areas.find((a) => a.id === line?.area_id);
                    const plant = plants.find((p) => p.id === line?.plant_id);
                    return (
                      <div
                        key={machine.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{machine.name}</h3>
                            <Badge
                              variant={
                                machine.is_active ? 'default' : 'secondary'
                              }
                            >
                              {machine.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            Code: {machine.code} | Machine #:{' '}
                            {machine.machine_number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {plant?.name || 'Unknown'} →{' '}
                            {area?.name || 'Unknown'} →{' '}
                            {line?.name || 'Unknown'}
                          </p>
                          {machine.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {machine.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(machine)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(machine)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(machine)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {filteredMachines.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No machines found
                    </div>
                  )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Code</th>
                        <th className="text-left p-3 font-medium">Machine #</th>
                        <th className="text-left p-3 font-medium">Plant</th>
                        <th className="text-left p-3 font-medium">Area</th>
                        <th className="text-left p-3 font-medium">Line</th>
                        <th className="text-left p-3 font-medium">
                          Description
                        </th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Created</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMachines.map((machine) => {
                        const line = lines.find(
                          (l) => l.id === machine.line_id,
                        );
                        const area = areas.find((a) => a.id === line?.area_id);
                        const plant = plants.find(
                          (p) => p.id === line?.plant_id,
                        );
                        return (
                          <tr
                            key={machine.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3">
                              <div className="font-medium">{machine.name}</div>
                            </td>
                            <td className="p-3">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {machine.code}
                              </code>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {machine.machine_number}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {plant?.name || 'Unknown'}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {area?.name || 'Unknown'}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {line?.name || 'Unknown'}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-gray-600 max-w-xs truncate">
                                {machine.description || 'No description'}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge
                                variant={
                                  machine.is_active ? 'default' : 'secondary'
                                }
                              >
                                {machine.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  machine.created_at,
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleView(machine)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(machine)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(machine)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredMachines.length === 0 && (
                        <tr>
                          <td
                            colSpan={10}
                            className="text-center py-8 text-gray-500"
                          >
                            No machines found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </>
  );
};

export default MachineManagementPage;
